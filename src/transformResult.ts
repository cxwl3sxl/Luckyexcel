import { IuploadfileList } from "./ICommon";

/**
 * transformExcelToLuckyByUrl 结果
 *
 * @class TransformResult
 */
export class TransformResult {

    constructor(files: IuploadfileList, fs: string, binaryData: any) {
        this.files = files;
        this.fs = fs;
        this.binaryData = binaryData;
    }

    /**
     * excel文件解析成 luckysheetfile 转换后的JSON格式数据
     *
     * @type {IuploadfileList}
     * @memberof TransformResult
     */
    files: IuploadfileList;

    /**
     * excel文件解析成 luckysheetfile 的原始JSON格式字符串
     *
     * @type {string}
     * @memberof TransformResult
     */
    fs: string;

    /**
     * 从服务器下载到的原始二进制数据
     *
     * @type {*}
     * @memberof TransformResult
     */
    binaryData: any;
}