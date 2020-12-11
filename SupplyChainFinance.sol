pragma solidity>=0.4.24 <0.9.11;
pragma experimental ABIEncoderV2;

contract SupplyChainFinance {
    address private adminAddr;

    struct Info {
        uint balance;
        uint credit;
    }

    struct Credit {
        uint amount;
        address addr;
        uint timestamp;
        uint validity;
    }

    mapping (address => Info) private CompanyInfo;
    mapping (address => Credit[]) private  Credits_out;
    mapping (address => Credit[]) private Credits_in;

    event BalanceTransactionEvent(address from, address to, uint amount);
    event CreditTransactionEvent(address from, address to, uint amount);

    constructor() {
        adminAddr = msg.sender;
    }

    function mintBalance() public {
        if (msg.sender == adminAddr) CompanyInfo[msg.sender].balance += 100;
    }

    function mintCredit() public {
        if (msg.sender == adminAddr) CompanyInfo[msg.sender].credit += 100;
    }

    function tradingWithBalance(address receiver, uint amount) public {
        if (CompanyInfo[msg.sender].balance < amount) return;
        CompanyInfo[msg.sender].balance -= amount;
        CompanyInfo[receiver].balance += amount;
        emit BalanceTransactionEvent(msg.sender, receiver, amount);
    }

    function tradingWithCredit(address receiver, uint amount, uint validity) public {
        if (CompanyInfo[msg.sender].credit < amount) return;
        CompanyInfo[msg.sender].credit -= amount;
        CompanyInfo[receiver].credit += amount;
        uint i;
        uint timestamp = block.timestamp;
        for(i = 0;i < Credits_out[msg.sender].length; i++){
            //有空页则覆盖
            if(Credits_out[msg.sender][i].amount == 0) {
                Credits_out[msg.sender][i].addr = receiver;
                Credits_out[msg.sender][i].amount = amount;
                Credits_out[msg.sender][i].timestamp = timestamp;
                Credits_out[msg.sender][i].validity = validity;
                break;
            }
        }
        // 否则填充新页
        if(i == Credits_out[msg.sender].length){
            Credit memory credit = Credit(amount,receiver,timestamp,validity);
            Credits_out[msg.sender].push(credit);
        }
        for(i = 0;i < Credits_in[receiver].length; i++){
            //有空页则覆盖
            if(Credits_in[receiver][i].amount == 0) {
                Credits_in[receiver][i].addr = msg.sender;
                Credits_in[receiver][i].amount = amount;
                Credits_in[receiver][i].timestamp = timestamp;
                Credits_in[receiver][i].validity = validity;
                break;
            }
        }
        // 否则填充新页
        if(i == Credits_in[receiver].length){
            Credit memory credit = Credit(amount,msg.sender,timestamp,validity);
            Credits_in[receiver].push(credit);
        }

        emit BalanceTransactionEvent(msg.sender, receiver, amount);
    }

    function getbalance() public view returns (uint balance) {
        return CompanyInfo[msg.sender].balance;
    }

    function getcredit() public view returns (uint credit) {
        return CompanyInfo[msg.sender].credit;
    }

    function getCreditInList() public view returns (Credit[] memory) {
        Credit[] memory list;
        for(uint i = 0;i < Credits_in[msg.sender].length; i++){
            //有则返回
            if(Credits_in[msg.sender][i].amount != 0) {
                list.push(Credits_in[msg.sender][i]);
            }
        }
        return list;
    }

    function getCreditOutList() public view returns (Credit[] memory) {
        Credit[] memory list;
        for(uint i = 0;i < Credits_out[msg.sender].length; i++){
            //有则返回
            if(Credits_out[msg.sender][i].amount != 0) {
                list.push(Credits_out[msg.sender][i]);
            }
        }
        return list;
    }
    // 
    function tradingWithCredit2(address receiver, uint amount,uint timestamp) public {
        for(uint i = 0;i < Credits_in[msg.sender].length; i++){
            //有则返回
            if(Credits_in[msg.sender][i].timestamp == timestamp) {
                
            }
        }
    }
}
