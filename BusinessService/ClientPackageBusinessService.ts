

import { getStandardResponse, apiResponseMessage, appConfig, dbconfig, msSqlParameter }
  from "../AppSettings";

import { RabbitMQQueueInfo, AppConfigHub,  } from "spartaxx.businessmodels/Common/CommonModel";
import { APICommonResponse } from "spartaxx.businessmodels/Common/APICommonResponse";
import { RabbitMQProducerActions } from "spartaxx.rabbitmqproducer/RabbitMQProducer";
import { checkFileExists, convertFileToBase64 } from "spartaxx.exportpdf";
import ConnectService from "spartaxx.connectservice";
import { ManageClientPackage, GenarateClientPackageParam, ClientPackageTestParam } from "spartaxx.businessmodels/CCC/CCCModel";
import { selectoperation } from "spartaxx.databaseservice/DatabaseServices";
import { ClientPackageDocument } from "spartaxx.businessmodels/CCC/ClientPackageDocuments";

async function reviewDocuments(param: ManageClientPackage): Promise<APICommonResponse> {

  let manageClientPackage: ManageClientPackage = {
    OutputFilePath: "",
    OutputBase64Format: "",
  };
  try {

    //#region Get getAppSettings
    
    const getAppSettings: any =
      await ConnectService.postcallwithoutdocker(appConfig.GetAppSettingsApiUrl, appConfig.GetAppSettingsApiMethodName, {});
    let appConfigHub: AppConfigHub = getAppSettings.data;

    //#endregion

    //#region Queue for client package

    let clientNumber: string = param.ItIsBeforeClient === true ? String(param.LeadId ?? 0) : param.ClientNumber ?? "";
    let filePath: string = (appConfigHub.CPckLetterGenPath ?? "") + (appConfigHub.CPckFileName?.replace("@@ClientNumber@@", clientNumber).replace("@@TimeStamp@@", "") ?? "");
    const clientPackageQueue: RabbitMQQueueInfo = {
      Host: appConfigHub.RMQConfigHost ?? "",
      UserName: appConfigHub.RMQConfigUserName ?? "",
      Password: appConfigHub.RMQConfigPassword ?? "",
      Port: appConfigHub.RMQConfigPort ?? "",
      QueueName: "",
      Message: ""
    };


    clientPackageQueue.QueueName = appConfigHub.RMQConfigClientPackageQueue ?? "";
    clientPackageQueue.Message = JSON.stringify(param);
    await RabbitMQProducerActions(clientPackageQueue);

    //#endregion

    //#region Check the data availabe in path

    manageClientPackage.OutputFilePath = filePath;

    for (let index = 0; index <= 300000; index++) {
      if (await checkFileExists(filePath)) {

        let base64FormatPath = await convertFileToBase64(filePath)
        manageClientPackage.OutputBase64Format = base64FormatPath;
        return getStandardResponse(true, apiResponseMessage.Success, manageClientPackage);

      }
    }
    //#endregion

    return getStandardResponse(false, apiResponseMessage.Failure, manageClientPackage);
  } catch (error) {
    return getStandardResponse(false, apiResponseMessage.Failure, null);
  }
}

async function retrieveClientPackageInfo(params: GenarateClientPackageParam): Promise<APICommonResponse> {

  let manageClientPackage: ManageClientPackage = {

    ClientNumber: "",
    ClientName: "",
    ContactEmail: "",
    ClientPackageDocument: []
  };

  try {
    const _dbparams: msSqlParameter[] = [
      new msSqlParameter("PackageIds", (params.DocuementIds ?? []).join(',')),
      new msSqlParameter("ClientId", params.ClientId),
      new msSqlParameter("LeadId", params.LeadId),
      new msSqlParameter("ItIsBeforeClient", params.ItIsBeforeClient === true ? 1 : 0)
    ];
    const _dbserviceparams = {
      spname: "SPX2_CP_RetrieveClientPackageInfo",
      dbparams: _dbparams,
      isquery: false,
      dbconfig: dbconfig.spartaxxdbconnection
    };

    const dbServiceResponse = await selectoperation(_dbserviceparams);
    if (dbServiceResponse && dbServiceResponse.length > 0) {
      const clientPackageDocument: ClientPackageDocument[] = dbServiceResponse[1];
      manageClientPackage = {
        ClientNumber: dbServiceResponse[0][0].ClientNumber,
        ClientName: dbServiceResponse[0][0].ClientName,
        ContactEmail: dbServiceResponse[0][0].ContactEmail,
        ClientPackageDocument: clientPackageDocument
      }
    }
    return getStandardResponse(true, apiResponseMessage.Success, manageClientPackage);

  }
  catch (error) {
    console.log("retrieveClientPackageInfo", error);
    return getStandardResponse(false, apiResponseMessage.Failure, null);
  }
}
async function ClientPackageInfoTest(params: ClientPackageTestParam): Promise<APICommonResponse> {

  let manageClientPackage: ManageClientPackage = {

    ClientNumber: "",
    ClientName: "",
    ContactEmail: "",
    ClientPackageDocument: []
  };

  try {
    const _dbparams: msSqlParameter[] = [
      new msSqlParameter("PackageIds", (params.DocuementIds ?? []).join(',')),
      new msSqlParameter("ClientId", params.ClientId),
      new msSqlParameter("LeadId", params.LeadId),
      new msSqlParameter("ItIsBeforeClient", params.ItIsBeforeClient === true ? 1 : 0)
    ];
    const _dbserviceparams = {
      spname: "SPX2_CP_ClientPackageInfoTest",
      dbparams: _dbparams,
      isquery: false,
      dbconfig: dbconfig.spartaxxdbconnection
    };

    const dbServiceResponse = await selectoperation(_dbserviceparams);
    if (dbServiceResponse && dbServiceResponse.length > 0) {
      const clientPackageDocument: ClientPackageDocument[] = dbServiceResponse[1];
      manageClientPackage = {
        ClientNumber: dbServiceResponse[0][0].ClientNumber,
        ClientName: dbServiceResponse[0][0].ClientName,
        ContactEmail: dbServiceResponse[0][0].ContactEmail,
        ClientPackageDocument: clientPackageDocument
      }
    }
    return getStandardResponse(true, apiResponseMessage.Success, manageClientPackage);

  }
  catch (error) {
    console.log("ClientPackageInfoTest", error);
    return getStandardResponse(false, apiResponseMessage.Failure, null);
  }
}

export {
  reviewDocuments,
  retrieveClientPackageInfo,
  ClientPackageInfoTest
};