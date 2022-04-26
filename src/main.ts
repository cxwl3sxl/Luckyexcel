import { LuckyFile } from "./ToLuckySheet/LuckyFile";
import { HandleZip } from './HandleZip';
import { IuploadfileList } from "./ICommon";

// api
export class LuckyExcel {
    static transformExcelToLucky(excelFile: File, callBack?: (files: IuploadfileList, fs?: string) => void) {
        let handleZip: HandleZip = new HandleZip(excelFile);
        handleZip.unzipFile(function (files: IuploadfileList) {
            let luckyFile = new LuckyFile(files, excelFile.name);
            let luckysheetfile = luckyFile.Parse();
            let exportJson = JSON.parse(luckysheetfile);
            if (callBack != undefined) {
                callBack(exportJson, luckysheetfile);
            }

        },
            function (err: Error) {
                console.error(err);
            });
    }

    static transformExcelToLuckyByUrl(url: string, name: string): Promise<{ files: IuploadfileList, fs: string, binaryData: any }> {
        return new Promise<{ files: IuploadfileList, fs: string, binaryData: any }>((acc, rej) => {
            let handleZip: HandleZip = new HandleZip();
            handleZip.unzipFileByUrl(url, function (files: IuploadfileList, binaryData: any) {
                let luckyFile = new LuckyFile(files, name);
                let luckysheetfile = luckyFile.Parse();
                let exportJson = JSON.parse(luckysheetfile);
                acc({
                    files: exportJson,
                    fs: luckysheetfile,
                    binaryData: binaryData
                });
            },
                function (err: Error) {
                    rej(err);
                });
        });
    }
}