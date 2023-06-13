import { Log, LogInterface } from "../models/log";
import { AppDataSource } from "../database";

const model = AppDataSource.getRepository(Log);

async function createLog(
    code: number,
    title: string,
    description: string
): Promise<LogInterface> {
    const log: LogInterface = new Log();
    log.description = description;
    log.title = title;
    log.code = code;
    return await model.save(log);
}

async function getLogs() {
    return await model.find();
}

export function getNowDate(): string {
    let now = new Date(); // Создаем объект Date с текущей датой и временем
    let utcDate = new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
        )
    ); // Создаем объект Date с теми же параметрами, но в UTC
    return utcDate.toUTCString(); // Возващаем объект Date, например: Fri Jan 28 2022 16:57:21 GMT+0300 (Москва, стандартное время)
}

export { createLog, getLogs };
