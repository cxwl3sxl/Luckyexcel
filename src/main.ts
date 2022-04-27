import { LuckyFile } from "./ToLuckySheet/LuckyFile";
import { HandleZip } from './HandleZip';
import { IuploadfileList } from "./ICommon";
import { TransformResult } from "./transformResult";

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

    /**
     * 从指定的URL地址中加载Excel，并且转换为luckysheet可识别的格式
     *
     * @static
     * @param {string} url excel文件路径，必须是xlsx格式的文件
     * @param {string} name 文件名称
     * @return { Promise<TransformResult> }  {Promise<TransformResult>}
     * @memberof LuckyExcel
     */
    static transformExcelToLuckyByUrl(url: string, name: string): Promise<TransformResult> {
        return new Promise<{ files: IuploadfileList, fs: string, binaryData: any }>((acc, rej) => {
            let handleZip: HandleZip = new HandleZip();
            handleZip.unzipFileByUrl(url, function (files: IuploadfileList, binaryData: any) {
                let luckyFile = new LuckyFile(files, name);
                let luckysheetfile = luckyFile.Parse();
                let exportJson = JSON.parse(luckysheetfile);
                acc(new TransformResult(exportJson, luckysheetfile, binaryData));
            },
                function (err: Error) {
                    rej(err);
                });
        });
    }
}