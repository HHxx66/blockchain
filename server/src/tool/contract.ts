import { join } from 'path';
import { readFileSync } from 'fs';

let abiFile = join(process.cwd(), 'src/conf/SupplyChainFinance.abi');
export const abi = JSON.parse(readFileSync(abiFile, 'utf-8').toString());

let binFile = join(process.cwd(), 'src/conf/SupplyChainFinance.bin');
export const bin = readFileSync(binFile, 'utf-8').toString();

export const getAbi = (functionName:string) => {
    if (functionName) {
        return abi.find((item:any) => {
            return item.type === 'function' && item.name === functionName;
        });
    }
    return abi;
};