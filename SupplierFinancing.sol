pragma solidity>=0.4.24 <0.9.11;
import "./Table.sol";

contract SupplierFinancing {
    // 中央银行的公钥地址
    address adminAddr;

    struct Receipt {
        uint amount;
        address addr;
        uint timestamp;
        uint validity;
    }

    // 转账交易事件
    event BalanceTransactionEvent(address from, address to, uint amount);
    // 信用凭证交易事件
    event CreditTransactionEvent(address from, address to, uint amount);
    // 信用凭证销毁事件
    event ReturnEvent(address from, address to, uint amount);

    constructor() {
        adminAddr = msg.sender;
        // 创建表。
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("CompanyInfo", "addr", "balance,credit");
        tf.createTable("Receipts_out", "from", "addr,amount,timestamp,validity");
        tf.createTable("Receipts_in", "to", "addr,amount,timestamp,validity");
        // 插入央行数据。
        insertCompany(adminAddr, 10000000000, 10000000000);
    }

    // 打开指定名称的 AMDB 表。
    function openTable(string memory tableName) private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        return tf.openTable(tableName);
    }

    // 插入公司信息。
    function insertCompany(address addr, uint balance, uint credit) private {
        Table company = openTable("CompanyInfo");
        Entries entries = company.select(toString(addr), company.newCondition());
        require(entries.size() == 0, "company should not exist");
        Entry entry = company.newEntry();
        entry.set("balance", balance);
        entry.set("credit", credit);
        // 插入数据，并判断是否需要回滚。
        company.insert(toString(addr), entry);
    }

    // 注册。
    function register() public {
        insertCompany(msg.sender, 0, 0);
    }

    // 更新公司余额信息。
    function updateCompanyBalance(address addr, uint balance) private {
        Table company = openTable("CompanyInfo");
        Entries entries = company.select(toString(addr), company.newCondition());
        require(entries.size() == 1, "company does not exist or is not unique");
        Entry entry = entries.get(0);
        entry.set("balance", balance);
        company.update(toString(addr), entry, company.newCondition());
    }

    // 更新公司信用信息。
    function updateCompanyCredit(address addr, uint credit) private {
        Table company = openTable("CompanyInfo");
        Entries entries = company.select(toString(addr), company.newCondition());
        require(entries.size() == 1, "company does not exist or is not unique");
        Entry entry = entries.get(0);
        entry.set("credit", credit);
        company.update(toString(addr), entry, company.newCondition());
    }

    // 获取公司的信用凭据信息。
    function getCompanyCredit(address addr) private view returns(uint credit) {
        Table company = openTable("CompanyInfo");
        Entries entries = company.select(toString(addr), company.newCondition());
        require(entries.size() == 1, "company does not exist or is not unique");
        return entries.get(0).getUInt("credit");
    }

    // 获取公司余额信息。
    function getCompanyBalance(address addr) private view returns(uint balance) {
        Table company = openTable("CompanyInfo");
        Entries entries = company.select(toString(addr), company.newCondition());
        require(entries.size() == 1, "company does not exist or is not unique");
        return entries.get(0).getUInt("balance");
    }

    function addbalance(address addr, uint balance) public {
        require(msg.sender == adminAddr, "The address must be adminAddr");
        updateCompanyBalance(addr, getCompanyBalance(addr) + balance);
        updateCompanyBalance(adminAddr, getCompanyBalance(adminAddr) - balance);
    }

    function addcredit(address addr, uint credit) public {
        require(msg.sender == adminAddr, "The address must be adminAddr");
        updateCompanyCredit(addr, getCompanyCredit(addr) + credit);
        updateCompanyCredit(adminAddr, getCompanyCredit(adminAddr) - credit);
    }

    // 获取公司的信用凭据信息。
    function getcredit() public view returns(uint credit) {
        return getCompanyCredit(msg.sender);
    }

    // 获取公司余额信息。
    function getbalance() public view returns(uint balance) {
        return getCompanyBalance(msg.sender);
    }

    function ResceiptToString(Receipt[] memory list) private view returns (string memory) {
        
    }

    function getReceiptsInList() public view returns (string memory) {
        Table company = openTable("Receipts_in");
        Entries entries = company.select(toString(msg.sender), company.newCondition());
        int size = entries.size();
        Receipt[] memory list = new Receipt[](uint256(size));
        for(int i = 0; i < size; i++){
            //有则返回
            list[uint(i)] = Receipt(entries.get(i).getUInt("amount"), entries.get(i).getAddress("from"), entries.get(i).getUInt("timestamp"), entries.get(i).getUInt("validity"));
        }
        return ResceiptToString(list);
    }

    function getReceiptsOutList() public view returns (string memory) {
        Table company = openTable("Receipts_out");
        Entries entries = company.select(toString(msg.sender), company.newCondition());
        int size = entries.size();
        Receipt[] memory list = new Receipt[](uint256(size));
        for(int i = 0; i < size; i++){
            //有则返回
            list[uint(i)] = Receipt(entries.get(i).getUInt("amount"), entries.get(i).getAddress("from"), entries.get(i).getUInt("timestamp"), entries.get(i).getUInt("validity"));
        }
        return ResceiptToString(list);
    }

    function tradingWithBalance(address receiver, uint amount) public {
        uint balance = getCompanyBalance(msg.sender);
        require(amount > 0, "amount must be greater than zero");
        require(balance >= amount, "You does not have enough balance");
        updateCompanyBalance(msg.sender, balance - amount);
        updateCompanyBalance(receiver, getCompanyBalance(receiver) + amount);
        emit BalanceTransactionEvent(msg.sender, receiver, amount);
    }

    // 插入票据信息。
    function insertReceipt(string memory tableName, string memory key, address addr, uint amount, uint timestamp, uint validity) private {
        Table receipt = openTable(tableName);
        Entry entry = receipt.newEntry();
        entry.set("addr", toString(addr));
        entry.set("amount", amount);
        entry.set("timestamp", timestamp);
        entry.set("validity", validity);
        // 插入数据，并判断是否回滚。
        receipt.insert(key, entry);
    }

    // 更新指定 key 和 timestamp 对应的票据金额。
    function updateReceipt(string memory tableName, string memory key, uint timestamp, uint newAmount) private {
        Table receipt = openTable(tableName);
        Condition condition = receipt.newCondition();
        condition.EQ("timestamp", int(timestamp));
        if (newAmount <= 0) {
            receipt.remove(key, condition);
            return;
        }
        Entries entries = receipt.select(key, condition);
        require(entries.size() == 1, "receipt not exists or unique");
        Entry entry = entries.get(0);
        entry.set("amount", newAmount);
        receipt.update(key, entry, condition);
    }


    function tradingWithCredit(address receiver, uint amount, uint validity) public {
        uint credit = getCompanyCredit(msg.sender);
        require(amount > 0, "amount must be greater than zero");
        require(credit >= amount, "You does not have enough credit");
        updateCompanyCredit(msg.sender, credit - amount);
        uint timestamp = block.timestamp;
        insertReceipt("Receipts_out", toString(msg.sender), receiver, amount, timestamp, validity);
        insertReceipt("Receipts_in", toString(receiver), msg.sender, amount, timestamp, validity);
        emit BalanceTransactionEvent(msg.sender, receiver, amount);
    }

    function tradingWithReceipt(address receiver, uint amount, uint timestamp) public {
        require(amount > 0, "amount must be greater than zero");
        Table receipt = openTable("Receipts_in");
        Condition condition = receipt.newCondition();
        condition.EQ("timestamp", int(timestamp));
        Entries entries = receipt.select(toString(msg.sender), condition);
        require(entries.size() == 1, "receipt does not exists or is not unique");
        Entry entry = entries.get(0);
        address addr = entry.getAddress("addr");
        uint receiptAmount = entry.getUInt("amount");
        uint validity = entry.getUInt("validity");
        require(receiptAmount >= amount, "You does not have enough receipt");
        updateReceipt("Receipts_out", toString(addr), timestamp, receiptAmount - amount);
        updateReceipt("Receipts_in", toString(msg.sender), timestamp, receiptAmount - amount);
        
        entries = receipt.select(toString(receiver), condition);
        require(entries.size() <= 1, "receipt must not exists or be unique");
        entry = entries.get(0);
        receiptAmount = entry.getUInt("amount");
        if(entries.size() == 0) {
            insertReceipt("Receipts_out", toString(addr), receiver, amount, timestamp, validity);
            insertReceipt("Receipts_in", toString(receiver), addr, amount, timestamp, validity);
        }
        else {
            updateReceipt("Receipts_out", toString(addr), timestamp, receiptAmount + amount);
            updateReceipt("Receipts_in", toString(receiver), timestamp, receiptAmount + amount);
        }
        emit BalanceTransactionEvent(msg.sender, receiver, amount);
    }

    // 转换地址为字符串。
    function toString(address x) private returns (string memory) {
        bytes32 value = bytes32(uint256(x));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

}