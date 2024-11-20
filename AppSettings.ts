//#region Application Config Types

interface AppConfig {
    CurrentTaxYear: number;
    GridOffsetValue: number;
    GridFetchRecordsCounts: number;
    GetAppSettingsApiUrl: string;
    GetAppSettingsApiMethodName: string;
}

interface DbConfig {
    usermanagementdbconnection: DbConnectionConfig;
    spartaxxdbconnection: DbConnectionConfig;
    csdbtaxrolldbconnection: DbConnectionConfig;
    marketingDocumentdbconnection: DbConnectionConfig;
}

interface DbConnectionConfig {
    user: string;
    password: string;
    server: string;
    port: number;
    database: string;
    options: {
        encrypt: boolean;
        requestTimeout: number;
    };
}

interface ElasticConfig {
    AZServer: {
        Base_URL: string;
        SalesContactResearch_Core: string;
        CalesContactResearch_NonCore: string;
    };
}

interface DbServiceBaseUrl {
    User_Management_DBService_Server_Url: string;
    Spartaxx_DBService_Server_Url: string;

}

interface ExportExcelConfig {
    AppBaseURL: string,
    AppDirName: string,
    ExportDirName: string,
    FileName: string
}

interface ExportPdfConfig {
    AppBaseURL: string,
    AppDirName: string,
    ExportDirName: string,
    FileName: string
}

interface QueueConfig {
    clientSetupQueue: ConsumerQueueConfig;
    emailSetupQueue: ConsumerQueueConfig;
    smsSetupQueue: ConsumerQueueConfig;
    protestCountyQueue: ConsumerQueueConfig
}

interface ConsumerQueueConfig {
    Queue: string;
    RabbitMQURL: string;
    Type: string;
}

interface RabbitMQQueueInfo {
    QueueName: string;
    UserName: string;
    Password: string;
    Host: string;
    Port: String;
    Message: string;
}

interface RabbitMQConfig {
    protestCountyQueue: RabbitMQQueueInfo;
    protestLetterGenerationQueue: RabbitMQQueueInfo;
    hb201ProtestLetterGenerationQueue: RabbitMQQueueInfo;
    excelFileGenerationQueue: RabbitMQQueueInfo;
    cccUSMailBlastQueue: RabbitMQQueueInfo;
    cccEMailBlastQueue: RabbitMQQueueInfo;
    emailSenderService: RabbitMQQueueInfo;
    cccResidentialCoverLetterService: RabbitMQQueueInfo;
    cccCommercialCoverLetterService: RabbitMQQueueInfo;
    cccContactForm: RabbitMQQueueInfo;
    cccResidentialAgreement: RabbitMQQueueInfo;
    cccAccountList: RabbitMQQueueInfo;
    cccCommercialAgreement: RabbitMQQueueInfo;
    cccConsentForm: RabbitMQQueueInfo;
    cccAofAExpiryDateFrom: RabbitMQQueueInfo;
    cccResidentialAofA: RabbitMQQueueInfo;
    cccCommercialAofA: RabbitMQQueueInfo;
    cccPropertySurvey: RabbitMQQueueInfo;
    cccBAAofA: RabbitMQQueueInfo;
    cccReasons: RabbitMQQueueInfo;
    clientPackageQueue: RabbitMQQueueInfo;
    cpTexasCommercialAgreement: RabbitMQQueueInfo;
    cpOOTPowerOfAttorney: RabbitMQQueueInfo;
    cpAuthorizationForm: RabbitMQQueueInfo;
    cpOOTCommercialAgreement: RabbitMQQueueInfo;
    createClientQueue:RabbitMQQueueInfo;
}

class msSqlParameter {
    Key: string;
    Value: any;

    constructor(_key: string, _value: any) {
        this.Key = _key;
        this.Value = _value;
    }
}

//#endregion

//#region Application Config Info

function getStandardResponse(status: boolean, message: string, data: any) {
    return {
        success: status,
        message: message,
        data: data,
    };
}

const apiResponseMessage = {
    Success: "success",
    Failure: "failure",
    Info: "info",
};

const dbconfig: DbConfig = {
    usermanagementdbconnection: {
        user: "spartaxxcommonuser",
        password: "123!@#",
        server: "PFBADBUAT",
        port: 1433,
        database: "SPARTAXXNEW_UserManagement",
        options: {
            encrypt: false,
            requestTimeout: 120000
        }
    },
    spartaxxdbconnection: {
        user: "spartaxxcommonuser",
        password: "123!@#",
        server: "PFBADBUAT",
        port: 1433,
        database: "SPARTAXX",
        options: {
            encrypt: false,
            requestTimeout: 120000
        }
    },
    csdbtaxrolldbconnection: {
        user: "spartaxxcommonuser",
        password: "123!@#",
        server: "PFBADBUAT",
        port: 1433,
        database: "CSDBTaxroll",
        options: {
            encrypt: false,
            requestTimeout: 120000
        }
    },
    marketingDocumentdbconnection: {
        user: "spartaxxcommonuser",
        password: "123!@#",
        server: "PFBADBUAT",
        port: 1433,
        database: "MarketingDocument",
        options: {
            encrypt: false,
            requestTimeout: 120000
        }
    },
};

const elasticconfig: ElasticConfig = {
    AZServer: {
        Base_URL: "http://azspxes:9200",
        SalesContactResearch_Core: "taxroll_core_smartprepweb_08may2021",
        CalesContactResearch_NonCore: "taxroll_noncore_smartprepweb_2023"
    }
};

const dbservicebaseurl: DbServiceBaseUrl = {
    User_Management_DBService_Server_Url: "http://localhost:8001/",
    Spartaxx_DBService_Server_Url: "http://localhost:8002/",
};

const queueConfig: QueueConfig = {
    clientSetupQueue: {
        Queue: "ClientSetup",
        RabbitMQURL: "amqp://spxv2rabbitmq:spxv2rabbitmq@spartaxx2uat",
        Type: "ClientSetup",
    },
    emailSetupQueue: {
        Queue: "Email",
        RabbitMQURL: "amqp://spxv2rabbitmq:spxv2rabbitmq@spartaxx2uat",
        Type: "Email",
    },
    smsSetupQueue: {
        Queue: "SMS",
        RabbitMQURL: "amqp://spxv2rabbitmq:spxv2rabbitmq@spartaxx2uat",
        Type: "SMS",
    },
    protestCountyQueue: {
        Queue: "protestcountyqueue",
        RabbitMQURL: "amqp://192.168.4.19:15672",
        Type: "protestcountyqueue"
    }
};

const exportExcelConfig: {
    ProtestHistroy: ExportExcelConfig, ProtestingAccounts: ExportExcelConfig,
    QualifiedClientList: ExportExcelConfig, DeliveredClientList: ExportExcelConfig,
    PendingClientList: ExportExcelConfig, ReceivedClientList: ExportExcelConfig, PriorityCountyList: ExportExcelConfig
} = {
    ProtestHistroy: {
        AppBaseURL: "http://localhost:9091/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.ProtestModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "ProtestHistroy_@@datetimestamp@@.xlsx"
    },
    ProtestingAccounts: {
        AppBaseURL: "http://localhost:9091/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.ProtestModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "ProtestingAccounts_@@datetimestamp@@.xlsx"
    },
    QualifiedClientList: {
        AppBaseURL: "http://localhost:9095/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.CCCModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "QualifiedClientList_@@datetimestamp@@.xlsx"
    },
    DeliveredClientList: {
        AppBaseURL: "http://localhost:9095/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.CCCModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "DeliveredClientList_@@datetimestamp@@.xlsx"
    },
    PendingClientList: {
        AppBaseURL: "http://localhost:9095/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.CCCModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "PendingClientList_@@datetimestamp@@.xlsx"
    },
    ReceivedClientList: {
        AppBaseURL: "http://localhost:9095/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.CCCModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "ReceivedClientList_@@datetimestamp@@.xlsx"
    },
    PriorityCountyList: {
        AppBaseURL: "http://localhost:9095/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.CCCModule.Microservice\\api\\",
        ExportDirName: "ExportExcel\\",
        FileName: "PriorityCountyList_@@datetimestamp@@.xlsx"
    }
};

const exportPDFConfig: { ProtestPdfDocument: ExportPdfConfig } = {
    ProtestPdfDocument: {
        AppBaseURL: "http://localhost:9091/",
        AppDirName: "C:\\SPARTAXX-V2.0\\Code\\SpartaxxVersion2.0\\Spataxx.ProtestModule.Microservice\\api\\",
        ExportDirName: "ExportPdf\\",
        FileName: "Protest_@@datetimestamp@@.pdf"
    },
};

const appConfig: AppConfig = {
    CurrentTaxYear: 2024,
    GridOffsetValue: 0,
    GridFetchRecordsCounts: 10,
    GetAppSettingsApiUrl: "http://localhost:9097/hub/",
    GetAppSettingsApiMethodName: "getappsettings"
};

const rabbitMQConfig: RabbitMQConfig = {
    protestCountyQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "protestcountyqueue",
        Message: "",
    },
    protestLetterGenerationQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "protestlettergenerationqueue",
        Message: "",
    },
    hb201ProtestLetterGenerationQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "hb201protestlettergenerationqueue",
        Message: "",
    },
    excelFileGenerationQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "excelfilegenerationqueue",
        Message: "",
    },
    cccUSMailBlastQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccusmailblastqueue",
        Message: "",
    },
    cccEMailBlastQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccemailblastqueue",
        Message: "",
    },
    emailSenderService: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "emailsenderservice",
        Message: "",
    },
    cccResidentialCoverLetterService: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccresidentialcoverlettercervice",
        Message: "",
    },
    cccCommercialCoverLetterService: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "ccccommercialcoverletterservice",
        Message: "",
    },
    cccContactForm: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "ccccontactform",
        Message: "",
    },
    cccResidentialAgreement: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccresidentialagreement",
        Message: "",
    },
    cccCommercialAgreement: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "ccccommercialagreement",
        Message: "",
    },
    cccAccountList: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccaccountlist",
        Message: "",
    },
    cccAofAExpiryDateFrom: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccaofaexpirydatefrom",
        Message: "",
    },
    cccConsentForm: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccconsentform",
        Message: "",
    },
    cccResidentialAofA: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccresidentialaofa",
        Message: "",
    },
    cccCommercialAofA: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "ccccommercialaofa",
        Message: "",
    },
    cccPropertySurvey: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccpropertysurvey",
        Message: "",
    },
    cccBAAofA: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccbaaofa",
        Message: "",
    },
    cccReasons: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cccreasons",
        Message: "",
    },
    clientPackageQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "clientpackagequeue",
        Message: "",
    },
    cpTexasCommercialAgreement: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cptexascommercialagreement",
        Message: "",
    },
    cpOOTPowerOfAttorney: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cpootpowerOfattorney",
        Message: "",
    },
    cpAuthorizationForm: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cpauthorizationform",
        Message: "",
    },
    cpOOTCommercialAgreement: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "cpootcommercialagreement",
        Message: "",
    },
    createClientQueue: {
        UserName: "spxv2rabbitmq",
        Password: "spxv2rabbitmq",
        Host: "192.168.4.19",
        Port: "15672",
        QueueName: "createclientqueue",
        Message: "",
    },
};

//#endregion

export {
    getStandardResponse,
    apiResponseMessage,
    dbconfig,
    elasticconfig,
    dbservicebaseurl,
    msSqlParameter,
    queueConfig,
    exportExcelConfig,
    exportPDFConfig,
    appConfig,
    rabbitMQConfig
}