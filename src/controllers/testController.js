const { response } = require("express");
const path = require('path')
const ejs = require('ejs');
const puppeteer = require('puppeteer');

module.exports = {
    flight : (request ,response)=>{
        let flightDetail = {
            "status": true,
            "data": {
                "groupedItineraryResponse": {
                    "version": "7.0.1",
                    "messages": [
                        {
                            "severity": "Info",
                            "type": "SERVER",
                            "code": "GCA14-ISELL-TN-00-2025-02-00-GSTP",
                            "text": "27131"
                        },
                        {
                            "severity": "Info",
                            "type": "WORKERTHREAD",
                            "code": "TRANSACTIONID",
                            "text": "7386018870447755005"
                        },
                        {
                            "severity": "Info",
                            "type": "DRE",
                            "code": "RULEID",
                            "text": "21728"
                        },
                        {
                            "severity": "Info",
                            "type": "DEFAULT",
                            "code": "RULEID",
                            "text": "25238"
                        }
                    ],
                    "statistics": {
                        "itineraryCount": 50
                    },
                    "scheduleDescs": [
                        {
                            "id": 1,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 45,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "15:05:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "15:50:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 658,
                                "operating": "OU",
                                "operatingFlightNumber": 658,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 2,
                            "frequency": "****TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 496,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "10:15:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "11:55:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 611,
                                "operating": "LO",
                                "operatingFlightNumber": 611,
                                "equipment": {
                                    "code": "E95",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 3,
                            "frequency": "S****FS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 398,
                            "elapsedTime": 80,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "14:55:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "16:15:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1716,
                                "operating": "LH",
                                "operatingFlightNumber": 1716,
                                "equipment": {
                                    "code": "321",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 4,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 558,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "07:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "09:40:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 381,
                                "operating": "LO",
                                "operatingFlightNumber": 381,
                                "equipment": {
                                    "code": "E75",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 5,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 50,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "14:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "15:30:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 380,
                                "operating": "OU",
                                "operatingFlightNumber": 380,
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 6,
                            "frequency": "*M*W*F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "13:10:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "14:45:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1613,
                                "operating": "LH",
                                "operatingFlightNumber": 1613,
                                "disclosure": "CL",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 7,
                            "frequency": "S****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 321,
                            "elapsedTime": 80,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "20:30:00+02:00"
                            },
                            "arrival": {
                                "airport": "BER",
                                "city": "BER",
                                "country": "DE",
                                "time": "21:50:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 391,
                                "operating": "LO",
                                "operatingFlightNumber": 391,
                                "equipment": {
                                    "code": "E75",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 8,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 558,
                            "elapsedTime": 110,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "19:25:00+02:00"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "21:15:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1351,
                                "operating": "LH",
                                "operatingFlightNumber": 1351,
                                "equipment": {
                                    "code": "32N",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 9,
                            "frequency": "SMT*TFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 642,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "14:55:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "16:55:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 1349,
                                "operating": "LX",
                                "operatingFlightNumber": 1349,
                                "disclosure": "2L",
                                "equipment": {
                                    "code": "E90",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 10,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 558,
                            "elapsedTime": 110,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "14:20:00+02:00"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "16:10:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1349,
                                "operating": "LH",
                                "operatingFlightNumber": 1349,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 11,
                            "frequency": "S*TWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 398,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:15:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "11:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5992,
                                "operating": "OU",
                                "operatingFlightNumber": 4439,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 12,
                            "frequency": "S**WTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "06:00:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "07:35:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1617,
                                "operating": "LH",
                                "operatingFlightNumber": 1617,
                                "disclosure": "CL",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 13,
                            "frequency": "******S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 851,
                            "elapsedTime": 135,
                            "departure": {
                                "airport": "CPH",
                                "city": "CPH",
                                "country": "DK",
                                "time": "09:00:00+02:00",
                                "terminal": "3"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "11:15:00+02:00"
                            },
                            "carrier": {
                                "marketing": "SK",
                                "marketingFlightNumber": 2831,
                                "operating": "SK",
                                "operatingFlightNumber": 2831,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 14,
                            "frequency": "S*T*TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 558,
                            "elapsedTime": 110,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "09:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "11:30:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1347,
                                "operating": "LH",
                                "operatingFlightNumber": 1347,
                                "equipment": {
                                    "code": "320",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 15,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 686,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "17:10:00+02:00"
                            },
                            "arrival": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "19:10:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1316,
                                "operating": "KL",
                                "operatingFlightNumber": 1316,
                                "equipment": {
                                    "code": "73H",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 16,
                            "frequency": "****TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 458,
                            "elapsedTime": 80,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "18:00:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "19:20:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 6006,
                                "operating": "OU",
                                "operatingFlightNumber": 411,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 17,
                            "frequency": "*MT**F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "08:25:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:00:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1611,
                                "operating": "LH",
                                "operatingFlightNumber": 1611,
                                "disclosure": "CL",
                                "equipment": {
                                    "code": "CR9",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 18,
                            "frequency": "*****FS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 458,
                            "elapsedTime": 90,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "10:05:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "11:35:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 6000,
                                "operating": "OU",
                                "operatingFlightNumber": 417,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 19,
                            "frequency": "******S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 463,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "08:20:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "09:45:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 8438,
                                "operating": "WK",
                                "operatingFlightNumber": 438,
                                "disclosure": "WK",
                                "equipment": {
                                    "code": "320",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 20,
                            "frequency": "****TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 415,
                            "elapsedTime": 80,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "19:45:00+02:00"
                            },
                            "arrival": {
                                "airport": "CPH",
                                "city": "CPH",
                                "country": "DK",
                                "time": "21:05:00+02:00",
                                "terminal": "3"
                            },
                            "carrier": {
                                "marketing": "SK",
                                "marketingFlightNumber": 2752,
                                "operating": "SK",
                                "operatingFlightNumber": 2752,
                                "codeShared": " SAS LINK",
                                "equipment": {
                                    "code": "E95",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 21,
                            "frequency": "*M*WTF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 558,
                            "elapsedTime": 110,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "06:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "08:30:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1353,
                                "operating": "LH",
                                "operatingFlightNumber": 1353,
                                "equipment": {
                                    "code": "32A",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 22,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 271,
                            "elapsedTime": 65,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "20:15:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "21:20:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1730,
                                "operating": "LH",
                                "operatingFlightNumber": 1730,
                                "equipment": {
                                    "code": "32A",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 23,
                            "trafficRestriction": "G",
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 45,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "15:05:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "15:50:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5974,
                                "operating": "OU",
                                "operatingFlightNumber": 658,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 24,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 807,
                            "elapsedTime": 130,
                            "departure": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "21:00:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "23:10:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1975,
                                "operating": "KL",
                                "operatingFlightNumber": 1975,
                                "equipment": {
                                    "code": "73W",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 25,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 271,
                            "elapsedTime": 65,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "11:30:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "12:35:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1726,
                                "operating": "LH",
                                "operatingFlightNumber": 1726,
                                "equipment": {
                                    "code": "32N",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 26,
                            "trafficRestriction": "G",
                            "frequency": "***W*F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 45,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "22:05:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "22:50:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5970,
                                "operating": "OU",
                                "operatingFlightNumber": 656,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 27,
                            "trafficRestriction": "G",
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 50,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "14:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "15:30:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 4301,
                                "operating": "OU",
                                "operatingFlightNumber": 380,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 28,
                            "trafficRestriction": "G",
                            "frequency": "S*TWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 398,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:15:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "11:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 4305,
                                "operating": "OU",
                                "operatingFlightNumber": 4439,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 29,
                            "frequency": "S**WTF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 458,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "12:50:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "14:15:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1406,
                                "operating": "LH",
                                "operatingFlightNumber": 1406,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 30,
                            "frequency": "*MT*TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 642,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "19:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "21:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 1353,
                                "operating": "LX",
                                "operatingFlightNumber": 1353,
                                "disclosure": "2L",
                                "equipment": {
                                    "code": "E90",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 31,
                            "frequency": "SMT**F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 642,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "09:45:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "11:45:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 1343,
                                "operating": "LX",
                                "operatingFlightNumber": 1343,
                                "disclosure": "2L",
                                "equipment": {
                                    "code": "E90",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 32,
                            "frequency": "S**W*FS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 458,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "22:15:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "23:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1404,
                                "operating": "LH",
                                "operatingFlightNumber": 1404,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 33,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "07:35:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "09:15:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5721,
                                "operating": "LO",
                                "operatingFlightNumber": 351,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "E75",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 34,
                            "frequency": "****TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 580,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "12:05:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "13:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 6004,
                                "operating": "OU",
                                "operatingFlightNumber": 413,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 35,
                            "trafficRestriction": "Y",
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 415,
                            "elapsedTime": 90,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "20:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "CPH",
                                "city": "CPH",
                                "country": "DK",
                                "time": "22:10:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "SK",
                                "marketingFlightNumber": 8198,
                                "operating": "LO",
                                "operatingFlightNumber": 459,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "E95",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 36,
                            "frequency": "*MTW*FS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 50,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "06:30:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "07:20:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 650,
                                "operating": "OU",
                                "operatingFlightNumber": 650,
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 37,
                            "trafficRestriction": "G",
                            "frequency": "SM*W*F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 642,
                            "elapsedTime": 125,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "07:35:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "09:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 4501,
                                "operating": "LO",
                                "operatingFlightNumber": 411,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "295",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 38,
                            "frequency": "******S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 45,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "11:30:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "12:15:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 652,
                                "operating": "OU",
                                "operatingFlightNumber": 652,
                                "equipment": {
                                    "code": "320",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 39,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 398,
                            "elapsedTime": 80,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "09:10:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "10:30:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1718,
                                "operating": "LH",
                                "operatingFlightNumber": 1718,
                                "disclosure": "CL",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 40,
                            "frequency": "******S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 807,
                            "elapsedTime": 130,
                            "departure": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "09:55:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "12:05:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1971,
                                "operating": "KL",
                                "operatingFlightNumber": 1971,
                                "equipment": {
                                    "code": "73J",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 41,
                            "frequency": "**TW*FS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 271,
                            "elapsedTime": 60,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "08:55:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "09:55:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5988,
                                "operating": "OU",
                                "operatingFlightNumber": 4437,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 42,
                            "trafficRestriction": "Y",
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 496,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "10:15:00+02:00"
                            },
                            "arrival": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "11:55:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 5851,
                                "operating": "LO",
                                "operatingFlightNumber": 611,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "E90",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 43,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "17:10:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "18:50:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5723,
                                "operating": "LO",
                                "operatingFlightNumber": 353,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "E70",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 44,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 686,
                            "elapsedTime": 125,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "19:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "21:45:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1318,
                                "operating": "KL",
                                "operatingFlightNumber": 1318,
                                "codeShared": "/KLM CITYHOPPER",
                                "equipment": {
                                    "code": "E90",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 45,
                            "frequency": "S*TWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 398,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:15:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "11:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 4439,
                                "operating": "OU",
                                "operatingFlightNumber": 4439,
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 46,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 686,
                            "elapsedTime": 120,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "06:00:00+02:00"
                            },
                            "arrival": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "08:00:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1310,
                                "operating": "KL",
                                "operatingFlightNumber": 1310,
                                "equipment": {
                                    "code": "73H",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 47,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "07:35:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "09:15:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LO",
                                "marketingFlightNumber": 351,
                                "operating": "LO",
                                "operatingFlightNumber": 351,
                                "equipment": {
                                    "code": "E75",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 48,
                            "frequency": "S**W*F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 60,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "09:00:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "10:00:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 99,
                                "operating": "LH",
                                "operatingFlightNumber": 99,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 49,
                            "trafficRestriction": "G",
                            "frequency": "SMT**F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 154,
                            "elapsedTime": 50,
                            "departure": {
                                "airport": "ZAG",
                                "city": "ZAG",
                                "country": "HR",
                                "time": "14:40:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "15:30:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 5976,
                                "operating": "OU",
                                "operatingFlightNumber": 380,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 50,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 807,
                            "elapsedTime": 130,
                            "departure": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "09:55:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "12:05:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1971,
                                "operating": "KL",
                                "operatingFlightNumber": 1971,
                                "equipment": {
                                    "code": "73H",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 51,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "17:00:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "18:35:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 1615,
                                "operating": "LH",
                                "operatingFlightNumber": 1615,
                                "disclosure": "CL",
                                "equipment": {
                                    "code": "CR9",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 52,
                            "frequency": "******S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 463,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "10:30:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "12:05:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 4254,
                                "operating": "OU",
                                "operatingFlightNumber": 463,
                                "disclosure": "OU",
                                "equipment": {
                                    "code": "DH4",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 53,
                            "frequency": "****TF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 580,
                            "elapsedTime": 95,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "12:05:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "13:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 413,
                                "operating": "OU",
                                "operatingFlightNumber": 413,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 54,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 60,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:00:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "11:00:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 101,
                                "operating": "LH",
                                "operatingFlightNumber": 101,
                                "equipment": {
                                    "code": "319",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 55,
                            "frequency": "S*T*T*S",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 411,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "BER",
                                "city": "BER",
                                "country": "DE",
                                "time": "07:15:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "08:40:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 963,
                                "operating": "LX",
                                "operatingFlightNumber": 963,
                                "equipment": {
                                    "code": "321",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 56,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 55,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "10:15:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "11:10:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 100,
                                "operating": "LH",
                                "operatingFlightNumber": 100,
                                "equipment": {
                                    "code": "321",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 57,
                            "frequency": "SMTWTFS",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 55,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "09:45:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "10:40:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 102,
                                "operating": "LH",
                                "operatingFlightNumber": 102,
                                "equipment": {
                                    "code": "32A",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 58,
                            "frequency": "**TWTF*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 686,
                            "elapsedTime": 125,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "12:25:00+02:00"
                            },
                            "arrival": {
                                "airport": "AMS",
                                "city": "AMS",
                                "country": "NL",
                                "time": "14:30:00+02:00"
                            },
                            "carrier": {
                                "marketing": "KL",
                                "marketingFlightNumber": 1314,
                                "operating": "KL",
                                "operatingFlightNumber": 1314,
                                "equipment": {
                                    "code": "73H",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 59,
                            "trafficRestriction": "O",
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 484,
                            "elapsedTime": 100,
                            "departure": {
                                "airport": "WAW",
                                "city": "WAW",
                                "country": "PL",
                                "time": "07:35:00+02:00"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "09:15:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "OU",
                                "marketingFlightNumber": 5857,
                                "operating": "LO",
                                "operatingFlightNumber": 351,
                                "disclosure": "LO",
                                "equipment": {
                                    "code": "E95",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 60,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 463,
                            "elapsedTime": 85,
                            "departure": {
                                "airport": "ZRH",
                                "city": "ZRH",
                                "country": "CH",
                                "time": "18:55:00+02:00"
                            },
                            "arrival": {
                                "airport": "SPU",
                                "city": "SPU",
                                "country": "HR",
                                "time": "20:20:00+02:00"
                            },
                            "carrier": {
                                "marketing": "LX",
                                "marketingFlightNumber": 8438,
                                "operating": "WK",
                                "operatingFlightNumber": 438,
                                "disclosure": "WK",
                                "equipment": {
                                    "code": "320",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 61,
                            "frequency": "*****F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 60,
                            "departure": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "08:30:00+02:00",
                                "terminal": "2"
                            },
                            "arrival": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "09:30:00+02:00",
                                "terminal": "1"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 97,
                                "operating": "LH",
                                "operatingFlightNumber": 97,
                                "equipment": {
                                    "code": "320",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        },
                        {
                            "id": 62,
                            "frequency": "S*TW*F*",
                            "stopCount": 0,
                            "eTicketable": true,
                            "totalMilesFlown": 186,
                            "elapsedTime": 55,
                            "departure": {
                                "airport": "FRA",
                                "city": "FRA",
                                "country": "DE",
                                "time": "12:15:00+02:00",
                                "terminal": "1"
                            },
                            "arrival": {
                                "airport": "MUC",
                                "city": "MUC",
                                "country": "DE",
                                "time": "13:10:00+02:00",
                                "terminal": "2"
                            },
                            "carrier": {
                                "marketing": "LH",
                                "marketingFlightNumber": 104,
                                "operating": "LH",
                                "operatingFlightNumber": 104,
                                "equipment": {
                                    "code": "321",
                                    "typeForFirstLeg": "N",
                                    "typeForLastLeg": "N"
                                }
                            }
                        }
                    ],
                    "taxDescs": [
                        {
                            "id": 1,
                            "code": "YQF",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "FRA"
                        },
                        {
                            "id": 2,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "FRA"
                        },
                        {
                            "id": 3,
                            "code": "YQI",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 4,
                            "code": "YQF",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 5,
                            "code": "YQF",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 6,
                            "code": "YQI",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "ZRH"
                        },
                        {
                            "id": 7,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "ZRH"
                        },
                        {
                            "id": 8,
                            "code": "YRI",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "FRA"
                        },
                        {
                            "id": 9,
                            "code": "YQI",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 10,
                            "code": "RA",
                            "amount": 2,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL ARRIVAL",
                            "publishedAmount": 0.52,
                            "publishedCurrency": "EUR",
                            "station": "WAW",
                            "country": "DE"
                        },
                        {
                            "id": 11,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "ZAG"
                        },
                        {
                            "id": 12,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 13,
                            "code": "YQF",
                            "amount": 87,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 22,
                            "publishedCurrency": "EUR",
                            "station": "CPH"
                        },
                        {
                            "id": 14,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "BER"
                        },
                        {
                            "id": 15,
                            "code": "YQF",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "ZAG"
                        },
                        {
                            "id": 16,
                            "code": "CJ",
                            "amount": 49,
                            "currency": "SAR",
                            "description": "SECURITY SERVICE CHARGE",
                            "publishedAmount": 12.45,
                            "publishedCurrency": "EUR",
                            "station": "AMS",
                            "country": "NL"
                        },
                        {
                            "id": 17,
                            "code": "YQF",
                            "amount": 4,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 1,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 18,
                            "code": "ND",
                            "amount": 2,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DEPARTURES",
                            "publishedAmount": 1.55,
                            "publishedCurrency": "PLN",
                            "station": "WAW",
                            "country": "PL"
                        },
                        {
                            "id": 19,
                            "code": "YQI",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "ZAG"
                        },
                        {
                            "id": 20,
                            "code": "HR",
                            "amount": 63,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE AND SECURITY CHARGE",
                            "publishedAmount": 15.8,
                            "publishedCurrency": "EUR",
                            "station": "ZAG",
                            "country": "HR"
                        },
                        {
                            "id": 21,
                            "code": "RN",
                            "amount": 59,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE",
                            "publishedAmount": 14.79,
                            "publishedCurrency": "EUR",
                            "station": "AMS",
                            "country": "NL"
                        },
                        {
                            "id": 22,
                            "code": "YQI",
                            "amount": 20,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 5,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 23,
                            "code": "YQI",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 24,
                            "code": "YQF",
                            "amount": 59,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 15,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 25,
                            "code": "YQF",
                            "amount": 177,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 45,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 26,
                            "code": "YQI",
                            "amount": 95,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 24,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 27,
                            "code": "YQF",
                            "amount": 177,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 45,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 28,
                            "code": "YQF",
                            "amount": 63,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 16,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 29,
                            "code": "RD2",
                            "amount": 76,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DOMESTIC DEPARTURE",
                            "publishedAmount": 19.14,
                            "publishedCurrency": "EUR",
                            "station": "MUC",
                            "country": "DE"
                        },
                        {
                            "id": 30,
                            "code": "MI",
                            "amount": 3,
                            "currency": "SAR",
                            "description": "CIVIL AVIATION AUTHORITY  CCAA  TAX",
                            "publishedAmount": 0.68,
                            "publishedCurrency": "EUR",
                            "station": "ZAG",
                            "country": "HR"
                        },
                        {
                            "id": 31,
                            "code": "YQF",
                            "amount": 87,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 22,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 32,
                            "code": "YQF",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "BER"
                        },
                        {
                            "id": 33,
                            "code": "YRF",
                            "amount": 6,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 1.5,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 34,
                            "code": "YRF",
                            "amount": 22,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 5.5,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 35,
                            "code": "RA2",
                            "amount": 76,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL DEPARTURE",
                            "publishedAmount": 19.14,
                            "publishedCurrency": "EUR",
                            "station": "MUC",
                            "country": "DE"
                        },
                        {
                            "id": 36,
                            "code": "YRI",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 37,
                            "code": "YRI",
                            "amount": 87,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 22,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 38,
                            "code": "DE",
                            "amount": 37,
                            "currency": "SAR",
                            "description": "AIRPORT SECURITY CHARGE",
                            "publishedAmount": 9.37,
                            "publishedCurrency": "EUR",
                            "station": "BER",
                            "country": "DE"
                        },
                        {
                            "id": 39,
                            "code": "CH",
                            "amount": 67,
                            "currency": "SAR",
                            "description": "AIRPORT PASSENGER SECURITY AND NOISE CHARGE",
                            "publishedAmount": 16,
                            "publishedCurrency": "CHF",
                            "station": "ZRH",
                            "country": "CH"
                        },
                        {
                            "id": 40,
                            "code": "YQF",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "ZRH"
                        },
                        {
                            "id": 41,
                            "code": "YQF",
                            "amount": 4,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 1,
                            "publishedCurrency": "EUR",
                            "station": "FRA"
                        },
                        {
                            "id": 42,
                            "code": "YQF",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "WAW"
                        },
                        {
                            "id": 43,
                            "code": "YQI",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 2,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 44,
                            "code": "RD2",
                            "amount": 107,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DOMESTIC DEPARTURE",
                            "publishedAmount": 27.11,
                            "publishedCurrency": "EUR",
                            "station": "FRA",
                            "country": "DE"
                        },
                        {
                            "id": 45,
                            "code": "YQF",
                            "amount": 177,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 45,
                            "publishedCurrency": "EUR",
                            "station": "FRA"
                        },
                        {
                            "id": 46,
                            "code": "YQF",
                            "amount": 63,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 16,
                            "publishedCurrency": "EUR",
                            "station": "CPH"
                        },
                        {
                            "id": 47,
                            "code": "YRF",
                            "amount": 66,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 69,
                            "publishedCurrency": "PLN",
                            "station": "WAW"
                        },
                        {
                            "id": 48,
                            "code": "ZO3",
                            "amount": 66,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE",
                            "publishedAmount": 124,
                            "publishedCurrency": "DKK",
                            "station": "CPH",
                            "country": "DK"
                        },
                        {
                            "id": 49,
                            "code": "YQF",
                            "amount": 52,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                            "publishedAmount": 13,
                            "publishedCurrency": "EUR",
                            "station": "MUC"
                        },
                        {
                            "id": 50,
                            "code": "YRI",
                            "amount": 87,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC",
                            "publishedAmount": 22,
                            "publishedCurrency": "EUR",
                            "station": "BER"
                        },
                        {
                            "id": 51,
                            "code": "XW",
                            "amount": 83,
                            "currency": "SAR",
                            "description": "AIRPORT TAX",
                            "publishedAmount": 87.34,
                            "publishedCurrency": "PLN",
                            "station": "WAW",
                            "country": "PL"
                        },
                        {
                            "id": 52,
                            "code": "RA2",
                            "amount": 107,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL DEPARTURE",
                            "publishedAmount": 27.11,
                            "publishedCurrency": "EUR",
                            "station": "FRA",
                            "country": "DE"
                        },
                        {
                            "id": 53,
                            "code": "RA2",
                            "amount": 35,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL DEPARTURE",
                            "publishedAmount": 8.79,
                            "publishedCurrency": "EUR",
                            "station": "BER",
                            "country": "DE"
                        }
                    ],
                    "taxSummaryDescs": [
                        {
                            "id": 1,
                            "code": "RA",
                            "amount": 107,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL DEPARTURE",
                            "publishedAmount": 27.11,
                            "publishedCurrency": "EUR",
                            "station": "FRA",
                            "country": "DE"
                        },
                        {
                            "id": 2,
                            "code": "YQF",
                            "amount": 126,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 3,
                            "code": "YQF",
                            "amount": 112,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 4,
                            "code": "YRF",
                            "amount": 6,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 5,
                            "code": "YQF",
                            "amount": 88,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 6,
                            "code": "YRI",
                            "amount": 87,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC"
                        },
                        {
                            "id": 7,
                            "code": "CJ",
                            "amount": 49,
                            "currency": "SAR",
                            "description": "SECURITY SERVICE CHARGE",
                            "publishedAmount": 12.45,
                            "publishedCurrency": "EUR",
                            "station": "AMS",
                            "country": "NL"
                        },
                        {
                            "id": 8,
                            "code": "ND",
                            "amount": 2,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DEPARTURES",
                            "publishedAmount": 1.55,
                            "publishedCurrency": "PLN",
                            "station": "WAW",
                            "country": "PL"
                        },
                        {
                            "id": 9,
                            "code": "YQF",
                            "amount": 177,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 10,
                            "code": "YQF",
                            "amount": 174,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 11,
                            "code": "HR",
                            "amount": 63,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE AND SECURITY CHARGE",
                            "publishedAmount": 15.8,
                            "publishedCurrency": "EUR",
                            "station": "ZAG",
                            "country": "HR"
                        },
                        {
                            "id": 12,
                            "code": "RA",
                            "amount": 37,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL ARRIVAL",
                            "publishedAmount": 0.52,
                            "publishedCurrency": "EUR",
                            "station": "WAW",
                            "country": "DE"
                        },
                        {
                            "id": 13,
                            "code": "RN",
                            "amount": 59,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE",
                            "publishedAmount": 14.79,
                            "publishedCurrency": "EUR",
                            "station": "AMS",
                            "country": "NL"
                        },
                        {
                            "id": 14,
                            "code": "YQF",
                            "amount": 164,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 15,
                            "code": "YQF",
                            "amount": 354,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 16,
                            "code": "RA",
                            "amount": 76,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE INTERNATIONAL DEPARTURE",
                            "publishedAmount": 19.14,
                            "publishedCurrency": "EUR",
                            "station": "MUC",
                            "country": "DE"
                        },
                        {
                            "id": 17,
                            "code": "YQF",
                            "amount": 72,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 18,
                            "code": "RD",
                            "amount": 76,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DOMESTIC DEPARTURE",
                            "publishedAmount": 19.14,
                            "publishedCurrency": "EUR",
                            "station": "MUC",
                            "country": "DE"
                        },
                        {
                            "id": 19,
                            "code": "MI",
                            "amount": 3,
                            "currency": "SAR",
                            "description": "CIVIL AVIATION AUTHORITY  CCAA  TAX",
                            "publishedAmount": 0.68,
                            "publishedCurrency": "EUR",
                            "station": "ZAG",
                            "country": "HR"
                        },
                        {
                            "id": 20,
                            "code": "YQF",
                            "amount": 80,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 21,
                            "code": "YRF",
                            "amount": 22,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 22,
                            "code": "YQF",
                            "amount": 119,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 23,
                            "code": "DE",
                            "amount": 37,
                            "currency": "SAR",
                            "description": "AIRPORT SECURITY CHARGE",
                            "publishedAmount": 9.37,
                            "publishedCurrency": "EUR",
                            "station": "BER",
                            "country": "DE"
                        },
                        {
                            "id": 24,
                            "code": "CH",
                            "amount": 67,
                            "currency": "SAR",
                            "description": "AIRPORT PASSENGER SECURITY AND NOISE CHARGE",
                            "publishedAmount": 16,
                            "publishedCurrency": "CHF",
                            "station": "ZRH",
                            "country": "CH"
                        },
                        {
                            "id": 25,
                            "code": "RD",
                            "amount": 107,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE DOMESTIC DEPARTURE",
                            "publishedAmount": 27.11,
                            "publishedCurrency": "EUR",
                            "station": "FRA",
                            "country": "DE"
                        },
                        {
                            "id": 26,
                            "code": "ZO",
                            "amount": 66,
                            "currency": "SAR",
                            "description": "PASSENGER SERVICE CHARGE",
                            "publishedAmount": 124,
                            "publishedCurrency": "DKK",
                            "station": "CPH",
                            "country": "DK"
                        },
                        {
                            "id": 27,
                            "code": "YQF",
                            "amount": 56,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 28,
                            "code": "YQF",
                            "amount": 76,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 29,
                            "code": "YQF",
                            "amount": 205,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 30,
                            "code": "YQF",
                            "amount": 48,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 31,
                            "code": "YRF",
                            "amount": 66,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 32,
                            "code": "YQI",
                            "amount": 95,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC"
                        },
                        {
                            "id": 33,
                            "code": "YQF",
                            "amount": 68,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED FUEL"
                        },
                        {
                            "id": 34,
                            "code": "YRI",
                            "amount": 8,
                            "currency": "SAR",
                            "description": "SERVICE FEE - CARRIER-IMPOSED MISC"
                        },
                        {
                            "id": 35,
                            "code": "XW",
                            "amount": 83,
                            "currency": "SAR",
                            "description": "AIRPORT TAX",
                            "publishedAmount": 87.34,
                            "publishedCurrency": "PLN",
                            "station": "WAW",
                            "country": "PL"
                        }
                    ],
                    "obFeeDescs": [
                        {
                            "id": 1,
                            "amount": 19,
                            "currency": "SAR"
                        },
                        {
                            "id": 2,
                            "amount": 27,
                            "currency": "SAR"
                        },
                        {
                            "id": 3,
                            "amount": 20,
                            "currency": "SAR"
                        },
                        {
                            "id": 4,
                            "amount": 23,
                            "currency": "SAR"
                        },
                        {
                            "id": 5,
                            "amount": 0,
                            "currency": "SAR"
                        },
                        {
                            "id": 6,
                            "amount": 24,
                            "currency": "SAR"
                        },
                        {
                            "id": 7,
                            "amount": 16,
                            "currency": "SAR"
                        },
                        {
                            "id": 8,
                            "amount": 21,
                            "currency": "SAR"
                        },
                        {
                            "id": 9,
                            "amount": 22,
                            "currency": "SAR"
                        }
                    ],
                    "fareComponentDescs": [
                        {
                            "id": 1,
                            "governingCarrier": "LH",
                            "fareAmount": 119.4,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02CLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 493,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPL",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "governingCarrier": "LH",
                            "fareAmount": 77.26,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02LGTU9/DXEU",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 319,
                            "publishedFareCurrency": "PLN",
                            "privateFare": true,
                            "directionality": "FROM",
                            "applicablePricingCategories": "1 4 5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "08",
                            "fareType": "EOU",
                            "fareTariff": "916",
                            "fareRule": "XLET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "governingCarrier": "LO",
                            "fareAmount": 193.76,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "L1STDOF5",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 800,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "4 5 7 8 9 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPL",
                            "fareTariff": "21",
                            "fareRule": "OFF1",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 4,
                            "governingCarrier": "OU",
                            "fareAmount": 233.97,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "HOPTI1",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 966,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "4 5 7 8 9 10 12 15 16 17 23 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XES",
                            "fareTariff": "21",
                            "fareRule": "7OUO",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 5,
                            "governingCarrier": "LH",
                            "fareAmount": 148.23,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "TETCLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 612,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPX",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 6,
                            "governingCarrier": "LH",
                            "fareAmount": 77.26,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02LGTU9/DXEU",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 319,
                            "publishedFareCurrency": "PLN",
                            "privateFare": true,
                            "directionality": "FROM",
                            "applicablePricingCategories": "1 4 5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "08",
                            "fareType": "EOU",
                            "fareTariff": "916",
                            "fareRule": "XLET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 7,
                            "governingCarrier": "LX",
                            "fareAmount": 79.44,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02LGTU9/DXEU",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 328,
                            "publishedFareCurrency": "PLN",
                            "privateFare": true,
                            "directionality": "FROM",
                            "applicablePricingCategories": "1 4 5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "08",
                            "fareType": "EOU",
                            "fareTariff": "916",
                            "fareRule": "XLET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 8,
                            "governingCarrier": "SK",
                            "fareAmount": 54.98,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "TPLOSM3",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 227,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "4 5 9 10 12 15 16 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XEX",
                            "fareTariff": "21",
                            "fareRule": "EMO2",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 9,
                            "governingCarrier": "LH",
                            "fareAmount": 148.23,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "TETCLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 612,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPX",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 10,
                            "governingCarrier": "LX",
                            "fareAmount": 150.41,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "TETCLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 621,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPX",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 11,
                            "governingCarrier": "LH",
                            "fareAmount": 119.4,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02CLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 493,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPL",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 12,
                            "governingCarrier": "SK",
                            "fareAmount": 44.8,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "OPLOSM3",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 185,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "4 5 9 10 12 15 16 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XEX",
                            "fareTariff": "21",
                            "fareRule": "EMO2",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 13,
                            "governingCarrier": "LO",
                            "fareAmount": 213.14,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "W1STDOF0",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 880,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "4 5 7 8 9 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPX",
                            "fareTariff": "21",
                            "fareRule": "OFF1",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 14,
                            "governingCarrier": "LX",
                            "fareAmount": 121.58,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02CLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 502,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPB",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 15,
                            "governingCarrier": "LX",
                            "fareAmount": 121.58,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "K02CLSE9",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 502,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "5 8 9 12 15 16 17 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XPB",
                            "fareTariff": "21",
                            "fareRule": "ZCET",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        },
                        {
                            "id": 16,
                            "governingCarrier": "KL",
                            "fareAmount": 77.5,
                            "fareCurrency": "NUC",
                            "fareBasisCode": "GYQFBBSA",
                            "farePassengerType": "ADT",
                            "publishedFareAmount": 320,
                            "publishedFareCurrency": "PLN",
                            "directionality": "FROM",
                            "applicablePricingCategories": "3 4 5 7 8 9 10 12 15 16 17 23 31 33",
                            "vendorCode": "ATP",
                            "fareTypeBitmap": "00",
                            "fareType": "XEX",
                            "fareTariff": "21",
                            "fareRule": "1L2Y",
                            "cabinCode": "Y",
                            "segments": [
                                {
                                    "segment": {}
                                },
                                {
                                    "segment": {
                                        "stopover": true
                                    }
                                }
                            ]
                        }
                    ],
                    "validatingCarrierDescs": [
                        {
                            "id": 1,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "HR"
                            }
                        },
                        {
                            "id": 2,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "LX"
                            }
                        },
                        {
                            "id": 3,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "SK"
                            }
                        },
                        {
                            "id": 4,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "KL"
                            }
                        },
                        {
                            "id": 5,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "LH"
                            }
                        },
                        {
                            "id": 6,
                            "settlementMethod": "BSP",
                            "newVcxProcess": true,
                            "default": {
                                "code": "LO"
                            }
                        }
                    ],
                    "baggageAllowanceDescs": [
                        {
                            "id": 1,
                            "pieceCount": 1
                        },
                        {
                            "id": 2,
                            "pieceCount": 1
                        },
                        {
                            "id": 3,
                            "pieceCount": 1
                        },
                        {
                            "id": 4,
                            "pieceCount": 1
                        },
                        {
                            "id": 5,
                            "pieceCount": 0
                        },
                        {
                            "id": 6,
                            "pieceCount": 1
                        },
                        {
                            "id": 7,
                            "pieceCount": 1
                        },
                        {
                            "id": 8,
                            "pieceCount": 0
                        }
                    ],
                    "legDescs": [
                        {
                            "id": 1,
                            "elapsedTime": 575,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 62
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "elapsedTime": 340,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 11
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "elapsedTime": 460,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 48
                                },
                                {
                                    "ref": 34
                                }
                            ]
                        },
                        {
                            "id": 4,
                            "elapsedTime": 575,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 57
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 5,
                            "elapsedTime": 575,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 56
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 6,
                            "elapsedTime": 570,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 25
                                },
                                {
                                    "ref": 49
                                }
                            ]
                        },
                        {
                            "id": 7,
                            "elapsedTime": 365,
                            "schedules": [
                                {
                                    "ref": 46
                                },
                                {
                                    "ref": 50
                                }
                            ]
                        },
                        {
                            "id": 8,
                            "elapsedTime": 715,
                            "schedules": [
                                {
                                    "ref": 8
                                },
                                {
                                    "ref": 32
                                },
                                {
                                    "ref": 36,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 9,
                            "elapsedTime": 615,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 10,
                            "elapsedTime": 1010,
                            "schedules": [
                                {
                                    "ref": 8
                                },
                                {
                                    "ref": 32
                                },
                                {
                                    "ref": 38,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 11,
                            "elapsedTime": 985,
                            "schedules": [
                                {
                                    "ref": 44
                                },
                                {
                                    "ref": 40,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 12,
                            "elapsedTime": 460,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 61
                                },
                                {
                                    "ref": 34
                                }
                            ]
                        },
                        {
                            "id": 13,
                            "elapsedTime": 420,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 34
                                }
                            ]
                        },
                        {
                            "id": 14,
                            "elapsedTime": 930,
                            "schedules": [
                                {
                                    "ref": 20
                                },
                                {
                                    "ref": 13,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 15,
                            "elapsedTime": 245,
                            "schedules": [
                                {
                                    "ref": 59
                                },
                                {
                                    "ref": 45
                                }
                            ]
                        },
                        {
                            "id": 16,
                            "elapsedTime": 460,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 54
                                },
                                {
                                    "ref": 34
                                }
                            ]
                        },
                        {
                            "id": 17,
                            "elapsedTime": 470,
                            "schedules": [
                                {
                                    "ref": 17
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 18,
                            "elapsedTime": 340,
                            "schedules": [
                                {
                                    "ref": 43
                                },
                                {
                                    "ref": 22
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 19,
                            "elapsedTime": 425,
                            "schedules": [
                                {
                                    "ref": 17
                                },
                                {
                                    "ref": 25
                                },
                                {
                                    "ref": 49
                                }
                            ]
                        },
                        {
                            "id": 20,
                            "elapsedTime": 350,
                            "schedules": [
                                {
                                    "ref": 51
                                },
                                {
                                    "ref": 22
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 21,
                            "elapsedTime": 315,
                            "schedules": [
                                {
                                    "ref": 2
                                },
                                {
                                    "ref": 27
                                }
                            ]
                        },
                        {
                            "id": 22,
                            "elapsedTime": 530,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 18
                                },
                                {
                                    "ref": 49
                                }
                            ]
                        },
                        {
                            "id": 23,
                            "elapsedTime": 765,
                            "schedules": [
                                {
                                    "ref": 37
                                },
                                {
                                    "ref": 60
                                }
                            ]
                        },
                        {
                            "id": 24,
                            "elapsedTime": 360,
                            "schedules": [
                                {
                                    "ref": 15
                                },
                                {
                                    "ref": 24
                                }
                            ]
                        },
                        {
                            "id": 25,
                            "elapsedTime": 845,
                            "schedules": [
                                {
                                    "ref": 30
                                },
                                {
                                    "ref": 19,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 26,
                            "elapsedTime": 520,
                            "schedules": [
                                {
                                    "ref": 33
                                },
                                {
                                    "ref": 3
                                }
                            ]
                        },
                        {
                            "id": 27,
                            "elapsedTime": 425,
                            "schedules": [
                                {
                                    "ref": 17
                                },
                                {
                                    "ref": 25
                                },
                                {
                                    "ref": 5
                                }
                            ]
                        },
                        {
                            "id": 28,
                            "elapsedTime": 635,
                            "schedules": [
                                {
                                    "ref": 31
                                },
                                {
                                    "ref": 60
                                }
                            ]
                        },
                        {
                            "id": 29,
                            "elapsedTime": 790,
                            "schedules": [
                                {
                                    "ref": 14
                                },
                                {
                                    "ref": 29
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 30,
                            "elapsedTime": 580,
                            "schedules": [
                                {
                                    "ref": 6
                                },
                                {
                                    "ref": 22
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 31,
                            "elapsedTime": 1030,
                            "schedules": [
                                {
                                    "ref": 46
                                },
                                {
                                    "ref": 24
                                }
                            ]
                        },
                        {
                            "id": 32,
                            "elapsedTime": 445,
                            "schedules": [
                                {
                                    "ref": 17
                                },
                                {
                                    "ref": 25
                                },
                                {
                                    "ref": 1
                                }
                            ]
                        },
                        {
                            "id": 33,
                            "elapsedTime": 645,
                            "schedules": [
                                {
                                    "ref": 58
                                },
                                {
                                    "ref": 24
                                }
                            ]
                        },
                        {
                            "id": 34,
                            "elapsedTime": 935,
                            "schedules": [
                                {
                                    "ref": 7
                                },
                                {
                                    "ref": 55,
                                    "departureDateAdjustment": 1
                                },
                                {
                                    "ref": 52,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 35,
                            "elapsedTime": 245,
                            "schedules": [
                                {
                                    "ref": 47
                                },
                                {
                                    "ref": 28
                                }
                            ]
                        },
                        {
                            "id": 36,
                            "elapsedTime": 370,
                            "schedules": [
                                {
                                    "ref": 14
                                },
                                {
                                    "ref": 29
                                },
                                {
                                    "ref": 23
                                }
                            ]
                        },
                        {
                            "id": 37,
                            "elapsedTime": 270,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 39
                                }
                            ]
                        },
                        {
                            "id": 38,
                            "elapsedTime": 335,
                            "schedules": [
                                {
                                    "ref": 42
                                },
                                {
                                    "ref": 1
                                }
                            ]
                        },
                        {
                            "id": 39,
                            "elapsedTime": 570,
                            "schedules": [
                                {
                                    "ref": 12
                                },
                                {
                                    "ref": 41
                                },
                                {
                                    "ref": 49
                                }
                            ]
                        },
                        {
                            "id": 40,
                            "elapsedTime": 550,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 29
                                },
                                {
                                    "ref": 23
                                }
                            ]
                        },
                        {
                            "id": 41,
                            "elapsedTime": 445,
                            "schedules": [
                                {
                                    "ref": 17
                                },
                                {
                                    "ref": 25
                                },
                                {
                                    "ref": 23
                                }
                            ]
                        },
                        {
                            "id": 42,
                            "elapsedTime": 315,
                            "schedules": [
                                {
                                    "ref": 42
                                },
                                {
                                    "ref": 5
                                }
                            ]
                        },
                        {
                            "id": 43,
                            "elapsedTime": 985,
                            "schedules": [
                                {
                                    "ref": 30
                                },
                                {
                                    "ref": 52,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        },
                        {
                            "id": 44,
                            "elapsedTime": 790,
                            "schedules": [
                                {
                                    "ref": 14
                                },
                                {
                                    "ref": 16
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 45,
                            "elapsedTime": 550,
                            "schedules": [
                                {
                                    "ref": 21
                                },
                                {
                                    "ref": 18
                                },
                                {
                                    "ref": 23
                                }
                            ]
                        },
                        {
                            "id": 46,
                            "elapsedTime": 325,
                            "schedules": [
                                {
                                    "ref": 9
                                },
                                {
                                    "ref": 60
                                }
                            ]
                        },
                        {
                            "id": 47,
                            "elapsedTime": 370,
                            "schedules": [
                                {
                                    "ref": 14
                                },
                                {
                                    "ref": 29
                                },
                                {
                                    "ref": 1
                                }
                            ]
                        },
                        {
                            "id": 48,
                            "elapsedTime": 360,
                            "schedules": [
                                {
                                    "ref": 4
                                },
                                {
                                    "ref": 53
                                }
                            ]
                        },
                        {
                            "id": 49,
                            "elapsedTime": 510,
                            "schedules": [
                                {
                                    "ref": 10
                                },
                                {
                                    "ref": 16
                                },
                                {
                                    "ref": 26
                                }
                            ]
                        },
                        {
                            "id": 50,
                            "elapsedTime": 875,
                            "schedules": [
                                {
                                    "ref": 35
                                },
                                {
                                    "ref": 13,
                                    "departureDateAdjustment": 1
                                }
                            ]
                        }
                    ],
                    "itineraryGroups": [
                        {
                            "groupDescription": {
                                "legDescriptions": [
                                    {
                                        "departureDate": "2025-04-11",
                                        "departureLocation": "WAW",
                                        "arrivalLocation": "SPU"
                                    }
                                ]
                            },
                            "itineraries": [
                                {
                                    "id": 1,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 14
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "SK",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "SK",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 12,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "O",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "V",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "O",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "V",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 48
                                                                },
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 28
                                                                },
                                                                {
                                                                    "ref": 46
                                                                },
                                                                {
                                                                    "ref": 34
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 21
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 483,
                                                                "totalTaxAmount": 299,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 194,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 184,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 46.86,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "SK",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 2
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 483,
                                                    "totalTaxAmount": 299,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 194,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 46.86,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 184,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 3
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 899.782
                                    }
                                },
                                {
                                    "id": 2,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 50
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "SK",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "SK",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 8,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "V",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 48
                                                                },
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 34
                                                                },
                                                                {
                                                                    "ref": 31
                                                                },
                                                                {
                                                                    "ref": 13
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 10
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 571,
                                                                "totalTaxAmount": 347,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 236,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 224,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 57.04,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "SK",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 2
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 571,
                                                    "totalTaxAmount": 347,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 236,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 57.04,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 224,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 3
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1140.858
                                    }
                                },
                                {
                                    "id": 3,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 24
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "KL",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-12",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "KL",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 16,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 13
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 597,
                                                                "totalTaxAmount": 294,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 320,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 303,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.5,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "KL",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 3
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 597,
                                                    "totalTaxAmount": 294,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 320,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.5,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 303,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 4
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 888.038
                                    }
                                },
                                {
                                    "id": 4,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 7
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "KL",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-12",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "KL",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 16,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 13
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 597,
                                                                "totalTaxAmount": 294,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 320,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 303,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.5,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "KL",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 3
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 597,
                                                    "totalTaxAmount": 294,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 320,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.5,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 303,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 4
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 982.597
                                    }
                                },
                                {
                                    "id": 5,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 33
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "KL",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-12",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "KL",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 16,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 13
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 597,
                                                                "totalTaxAmount": 294,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 320,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 303,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.5,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "KL",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 3
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 597,
                                                    "totalTaxAmount": 294,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 320,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.5,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 303,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 4
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1228.709
                                    }
                                },
                                {
                                    "id": 6,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 11
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "KL",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-12",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "KL",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 16,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 13
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 597,
                                                                "totalTaxAmount": 294,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 320,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 303,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.5,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "KL",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 3
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 597,
                                                    "totalTaxAmount": 294,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 320,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.5,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 303,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 4
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1299.157
                                    }
                                },
                                {
                                    "id": 7,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 31
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "KL",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-12",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "KL",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 16,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "G",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 21
                                                                },
                                                                {
                                                                    "ref": 26
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 13
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 597,
                                                                "totalTaxAmount": 294,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 320,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 303,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.5,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "KL",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 3
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 597,
                                                    "totalTaxAmount": 294,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 320,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.5,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 303,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 4
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1304.996
                                    }
                                },
                                {
                                    "id": 8,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 37
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 6,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 304,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 304,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 777.7
                                    }
                                },
                                {
                                    "id": 9,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 46
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 7,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "G",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "MP",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 40
                                                                },
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 295,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 328,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 311,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 79.44,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LX",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 5
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 295,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 328,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 79.44,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 311,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 861.452
                                    }
                                },
                                {
                                    "id": 10,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 17
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 6,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 304,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 304,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1079.196
                                    }
                                },
                                {
                                    "id": 11,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 9
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 6,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 304,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 304,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1237.127
                                    }
                                },
                                {
                                    "id": 12,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 28
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 7,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "G",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "MP",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 40
                                                                },
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 295,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 328,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 311,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 79.44,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LX",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 5
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 295,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 328,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 79.44,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 311,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1153.07
                                    }
                                },
                                {
                                    "id": 13,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 25
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 7,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "G",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "MP",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 40
                                                                },
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 606,
                                                                "totalTaxAmount": 295,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 328,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 311,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 79.44,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LX",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 5
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 606,
                                                    "totalTaxAmount": 295,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 328,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 79.44,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 311,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1296.266
                                    }
                                },
                                {
                                    "id": 14,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 5
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 2,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 44
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 41
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 25
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 20
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 1
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 737,
                                                                "totalTaxAmount": 435,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 737,
                                                    "totalTaxAmount": 435,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1486.177
                                    }
                                },
                                {
                                    "id": 15,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 4
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 2,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 44
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 41
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 25
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 20
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 1
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 737,
                                                                "totalTaxAmount": 435,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 737,
                                                    "totalTaxAmount": 435,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1486.177
                                    }
                                },
                                {
                                    "id": 16,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 1
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 2,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 44
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 41
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 25
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 20
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 1
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 737,
                                                                "totalTaxAmount": 435,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 319,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 302,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 77.26,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 8
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 737,
                                                    "totalTaxAmount": 435,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 319,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 77.26,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 302,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1486.177
                                    }
                                },
                                {
                                    "id": 17,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 43
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 14,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "G",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 7
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 30
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 3
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 762,
                                                                "totalTaxAmount": 287,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 502,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 475,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 121.58,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LX",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 6
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 762,
                                                    "totalTaxAmount": 287,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 502,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 121.58,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 475,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1658.22
                                    }
                                },
                                {
                                    "id": 18,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 2
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 11,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 30
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 3
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 763,
                                                                "totalTaxAmount": 296,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 763,
                                                    "totalTaxAmount": 296,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1336.372
                                    }
                                },
                                {
                                    "id": 19,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 13
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 11,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 30
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 8
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 794,
                                                                "totalTaxAmount": 327,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 794,
                                                    "totalTaxAmount": 327,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1488.75
                                    }
                                },
                                {
                                    "id": 20,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 27
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 837,
                                                                "totalTaxAmount": 370,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 837,
                                                    "totalTaxAmount": 370,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1574.545
                                    }
                                },
                                {
                                    "id": 21,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 32
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 837,
                                                                "totalTaxAmount": 370,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 837,
                                                    "totalTaxAmount": 370,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1594.062
                                    }
                                },
                                {
                                    "id": 22,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 39
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 849,
                                                                "totalTaxAmount": 382,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 849,
                                                    "totalTaxAmount": 382,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1709.171
                                    }
                                },
                                {
                                    "id": 23,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 20
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 857,
                                                                "totalTaxAmount": 390,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 857,
                                                    "totalTaxAmount": 390,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1516.89
                                    }
                                },
                                {
                                    "id": 24,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 19
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 857,
                                                                "totalTaxAmount": 390,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 857,
                                                    "totalTaxAmount": 390,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1612.168
                                    }
                                },
                                {
                                    "id": 25,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 41
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 857,
                                                                "totalTaxAmount": 390,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 857,
                                                    "totalTaxAmount": 390,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1632.152
                                    }
                                },
                                {
                                    "id": 26,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 6
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 857,
                                                                "totalTaxAmount": 390,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 857,
                                                    "totalTaxAmount": 390,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1725.276
                                    }
                                },
                                {
                                    "id": 27,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 30
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 857,
                                                                "totalTaxAmount": 390,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 857,
                                                    "totalTaxAmount": 390,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1730.992
                                    }
                                },
                                {
                                    "id": 28,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 34
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 15,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "W",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "G",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 38
                                                                },
                                                                {
                                                                    "ref": 10
                                                                },
                                                                {
                                                                    "ref": 53
                                                                },
                                                                {
                                                                    "ref": 4
                                                                },
                                                                {
                                                                    "ref": 9
                                                                },
                                                                {
                                                                    "ref": 7
                                                                },
                                                                {
                                                                    "ref": 32
                                                                },
                                                                {
                                                                    "ref": 14
                                                                },
                                                                {
                                                                    "ref": 50
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 23
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 864,
                                                                "totalTaxAmount": 389,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 502,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 475,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 121.58,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LO",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 7
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 864,
                                                    "totalTaxAmount": 389,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 502,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 121.58,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 475,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1869.844
                                    }
                                },
                                {
                                    "id": 29,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 47
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 868,
                                                                "totalTaxAmount": 401,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 868,
                                                    "totalTaxAmount": 401,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1565.919
                                    }
                                },
                                {
                                    "id": 30,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 8
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 868,
                                                                "totalTaxAmount": 401,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 868,
                                                    "totalTaxAmount": 401,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1815.516
                                    }
                                },
                                {
                                    "id": 31,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 10
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 868,
                                                                "totalTaxAmount": 401,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 868,
                                                    "totalTaxAmount": 401,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1893.701
                                    }
                                },
                                {
                                    "id": 32,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 49
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 880,
                                                                "totalTaxAmount": 413,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 880,
                                                    "totalTaxAmount": 413,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1731.529
                                    }
                                },
                                {
                                    "id": 33,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 22
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 880,
                                                                "totalTaxAmount": 413,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 880,
                                                    "totalTaxAmount": 413,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1745.887
                                    }
                                },
                                {
                                    "id": 34,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 45
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 880,
                                                                "totalTaxAmount": 413,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 880,
                                                    "totalTaxAmount": 413,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1759.2
                                    }
                                },
                                {
                                    "id": 35,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 44
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 33
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 880,
                                                                "totalTaxAmount": 413,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 880,
                                                    "totalTaxAmount": 413,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1866.38
                                    }
                                },
                                {
                                    "id": 36,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 36
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 888,
                                                                "totalTaxAmount": 421,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 888,
                                                    "totalTaxAmount": 421,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1602
                                    }
                                },
                                {
                                    "id": 37,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 40
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 888,
                                                                "totalTaxAmount": 421,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 888,
                                                    "totalTaxAmount": 421,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1775.193
                                    }
                                },
                                {
                                    "id": 38,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 29
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 11
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 28
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 888,
                                                                "totalTaxAmount": 421,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 888,
                                                    "totalTaxAmount": 421,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1883.347
                                    }
                                },
                                {
                                    "id": 39,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 16
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 29
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 894,
                                                                "totalTaxAmount": 427,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 894,
                                                    "totalTaxAmount": 427,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1717.063
                                    }
                                },
                                {
                                    "id": 40,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 12
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 29
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 894,
                                                                "totalTaxAmount": 427,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 894,
                                                    "totalTaxAmount": 427,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1717.063
                                    }
                                },
                                {
                                    "id": 41,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 3
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 1,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "R",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "K",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 29
                                                                },
                                                                {
                                                                    "ref": 42
                                                                },
                                                                {
                                                                    "ref": 12
                                                                },
                                                                {
                                                                    "ref": 22
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 2
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 17
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 4
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 894,
                                                                "totalTaxAmount": 427,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 493,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 467,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 119.4,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 894,
                                                    "totalTaxAmount": 427,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 493,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 119.4,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 467,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1717.063
                                    }
                                },
                                {
                                    "id": 42,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 26
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 5,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 23
                                                                },
                                                                {
                                                                    "ref": 3
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 3
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 939,
                                                                "totalTaxAmount": 360,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 612,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 579,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 148.23,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 939,
                                                    "totalTaxAmount": 360,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 612,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 148.23,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 579,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1855.428
                                    }
                                },
                                {
                                    "id": 43,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 23
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LX",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LX",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 10,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "MP",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 39
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 40
                                                                },
                                                                {
                                                                    "ref": 23
                                                                },
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 3
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 6
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 939,
                                                                "totalTaxAmount": 351,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 621,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 588,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 150.41,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LX",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 6
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 939,
                                                    "totalTaxAmount": 351,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 621,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 150.41,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 588,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 2
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1982.947
                                    }
                                },
                                {
                                    "id": 44,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 18
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LH",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LH",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 9,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RG",
                                                                                "seatsAvailable": 9
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "T",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 9,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 37
                                                                },
                                                                {
                                                                    "ref": 23
                                                                },
                                                                {
                                                                    "ref": 3
                                                                },
                                                                {
                                                                    "ref": 19
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 6
                                                                },
                                                                {
                                                                    "ref": 14
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 2
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1057,
                                                                "totalTaxAmount": 478,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 612,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 579,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 148.23,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LH",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        },
                                                                        {
                                                                            "id": 2
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1057,
                                                    "totalTaxAmount": 478,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 612,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 148.23,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 579,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 5
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1851.304
                                    }
                                },
                                {
                                    "id": 45,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 21
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LO",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-26",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LO",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 3,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "L",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 9
                                                                },
                                                                {
                                                                    "ref": 47
                                                                },
                                                                {
                                                                    "ref": 24
                                                                },
                                                                {
                                                                    "ref": 15
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 31
                                                                },
                                                                {
                                                                    "ref": 22
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1093,
                                                                "totalTaxAmount": 336,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 800,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 757,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 193.76,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LO",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 7
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1093,
                                                    "totalTaxAmount": 336,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 800,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 193.76,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 757,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 6
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1694.15
                                    }
                                },
                                {
                                    "id": 46,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 35
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "LO",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-02-28",
                                                "lastTicketTime": "12:07",
                                                "governingCarriers": "LO",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 13,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "W",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "W",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 4
                                                                },
                                                                {
                                                                    "ref": 49
                                                                },
                                                                {
                                                                    "ref": 9
                                                                },
                                                                {
                                                                    "ref": 43
                                                                },
                                                                {
                                                                    "ref": 47
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 5
                                                                },
                                                                {
                                                                    "ref": 31
                                                                }
                                                            ],
                                                            "obFees": [
                                                                {
                                                                    "ref": 5
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1148,
                                                                "totalTaxAmount": 315,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 880,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 833,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 213.14,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LO",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 7
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1148,
                                                    "totalTaxAmount": 315,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 880,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 213.14,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 833,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 6
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1377.6
                                    }
                                },
                                {
                                    "id": 47,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 42
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "HR",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-11",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "OU",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 4,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 25
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1242,
                                                                "totalTaxAmount": 328,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 966,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 914,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 233.97,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "OU",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 4
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1242,
                                                    "totalTaxAmount": 328,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 966,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 233.97,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 914,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 1
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1925.1
                                    }
                                },
                                {
                                    "id": 48,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 38
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "HR",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-11",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "OU",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 4,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "N",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 20
                                                                },
                                                                {
                                                                    "ref": 30
                                                                },
                                                                {
                                                                    "ref": 25
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 11
                                                                },
                                                                {
                                                                    "ref": 19
                                                                },
                                                                {
                                                                    "ref": 9
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1242,
                                                                "totalTaxAmount": 328,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 966,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 914,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 233.97,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "OU",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 4
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1242,
                                                    "totalTaxAmount": 328,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 966,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 233.97,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 914,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 1
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 2163.304
                                    }
                                },
                                {
                                    "id": 49,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 48
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "HR",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-11",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "OU",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 4,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 52
                                                                },
                                                                {
                                                                    "ref": 4
                                                                },
                                                                {
                                                                    "ref": 9
                                                                },
                                                                {
                                                                    "ref": 45
                                                                },
                                                                {
                                                                    "ref": 8
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 1
                                                                },
                                                                {
                                                                    "ref": 34
                                                                },
                                                                {
                                                                    "ref": 29
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1319,
                                                                "totalTaxAmount": 405,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 966,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 914,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 233.97,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "LO",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 7
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1319,
                                                    "totalTaxAmount": 405,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 966,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 233.97,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 914,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 1
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 2357.713
                                    }
                                },
                                {
                                    "id": 50,
                                    "pricingSource": "ADVJR1",
                                    "legs": [
                                        {
                                            "ref": 15
                                        }
                                    ],
                                    "pricingInformation": [
                                        {
                                            "pricingSubsource": "HPIS",
                                            "distributionModel": "ATPCO",
                                            "fare": {
                                                "validatingCarrierCode": "HR",
                                                "vita": true,
                                                "eTicketable": true,
                                                "lastTicketDate": "2025-03-11",
                                                "lastTicketTime": "23:59",
                                                "governingCarriers": "OU",
                                                "passengerInfoList": [
                                                    {
                                                        "passengerInfo": {
                                                            "passengerType": "ADT",
                                                            "passengerNumber": 1,
                                                            "nonRefundable": true,
                                                            "fareComponents": [
                                                                {
                                                                    "ref": 4,
                                                                    "beginAirport": "WAW",
                                                                    "endAirport": "SPU",
                                                                    "segments": [
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "RF",
                                                                                "seatsAvailable": 4
                                                                            }
                                                                        },
                                                                        {
                                                                            "segment": {
                                                                                "bookingCode": "H",
                                                                                "cabinCode": "Y",
                                                                                "mealCode": "S",
                                                                                "seatsAvailable": 4,
                                                                                "availabilityBreak": true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "taxes": [
                                                                {
                                                                    "ref": 18
                                                                },
                                                                {
                                                                    "ref": 51
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 25
                                                                },
                                                                {
                                                                    "ref": 27
                                                                },
                                                                {
                                                                    "ref": 36
                                                                }
                                                            ],
                                                            "taxSummaries": [
                                                                {
                                                                    "ref": 8
                                                                },
                                                                {
                                                                    "ref": 35
                                                                },
                                                                {
                                                                    "ref": 16
                                                                },
                                                                {
                                                                    "ref": 15
                                                                },
                                                                {
                                                                    "ref": 34
                                                                }
                                                            ],
                                                            "currencyConversion": {
                                                                "from": "PLN",
                                                                "to": "SAR",
                                                                "exchangeRateUsed": 0.9456725
                                                            },
                                                            "passengerTotalFare": {
                                                                "totalFare": 1437,
                                                                "totalTaxAmount": 523,
                                                                "currency": "SAR",
                                                                "baseFareAmount": 966,
                                                                "baseFareCurrency": "PLN",
                                                                "equivalentAmount": 914,
                                                                "equivalentCurrency": "SAR",
                                                                "constructionAmount": 233.97,
                                                                "constructionCurrency": "NUC",
                                                                "exchangeRateOne": 4.128703
                                                            },
                                                            "baggageInformation": [
                                                                {
                                                                    "provisionType": "A",
                                                                    "airlineCode": "OU",
                                                                    "segments": [
                                                                        {
                                                                            "id": 0
                                                                        },
                                                                        {
                                                                            "id": 1
                                                                        }
                                                                    ],
                                                                    "allowance": {
                                                                        "ref": 4
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "totalFare": {
                                                    "totalPrice": 1437,
                                                    "totalTaxAmount": 523,
                                                    "currency": "SAR",
                                                    "baseFareAmount": 966,
                                                    "baseFareCurrency": "PLN",
                                                    "constructionAmount": 233.97,
                                                    "constructionCurrency": "NUC",
                                                    "equivalentAmount": 914,
                                                    "equivalentCurrency": "SAR"
                                                },
                                                "validatingCarriers": [
                                                    {
                                                        "ref": 1
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "diversitySwapper": {
                                        "weighedPrice": 1724.4
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }


        let itineraryGroups = flightDetail.data.groupedItineraryResponse.itineraryGroups;
        let legsInformation = flightDetail.data.groupedItineraryResponse.legDescs;
        let baggageDescs = flightDetail.data.groupedItineraryResponse.baggageAllowanceDescs;
        let taxDescs= flightDetail.data.groupedItineraryResponse.taxDescs;
        let taxSummaryDescs = flightDetail.data.groupedItineraryResponse.taxSummaryDescs;
        let scheduleDescs = flightDetail.data.groupedItineraryResponse.scheduleDescs;
        let fareComponentDescs = flightDetail.data.groupedItineraryResponse.fareComponentDescs;
        let obFeeDescs = flightDetail.data.groupedItineraryResponse.obFeeDescs;
        let mappedLegs = Object.fromEntries(legsInformation.map(leg => [leg.id , leg]));
        let mappedSchedule = Object.fromEntries(scheduleDescs.map(schedule => [schedule.id , schedule]));
        let mappedBaggages = Object.fromEntries(baggageDescs.map(baggage => [baggage.id , baggage]));
        let mappedTax = Object.fromEntries(taxDescs.map(tax => [tax.id , tax]));
        let mappedTaxSummary = Object.fromEntries(taxSummaryDescs.map(taxSummary => [taxSummary.id , taxSummary]));
        let mappedFareComponent = Object.fromEntries(fareComponentDescs.map(fareComponent => [fareComponent.id , fareComponent]));
        let mappedObFees = Object.fromEntries(obFeeDescs.map(obFee => [obFee.id , obFee]));
       let itineraryGroupDetail = [];

    //    console.log(itineraryGroups);
    //     return;
       itineraryGroups.forEach( group => {

            let groupDescription = group.groupDescription;
            let groupItineraries = group.itineraries;
            
            let itinerariesList = groupItineraries.map( gi => {
                let priceSource = gi.pricingSource;
                let legIds = gi.legs.map( leg => leg.ref);
               
                let legDetail = legIds.map( leg => {
                    let legInformation = {};
                    let legSchedule = mappedLegs[leg].schedules;
                    let scheduleList = legSchedule.map( ls => {
                        return mappedSchedule[ls.ref];
                    })
                    legInformation.id = leg;
                    legInformation.schedule = scheduleList;

                    return legInformation;
                });

                let priceInformationList = gi.pricingInformation;
                let priceDetail = [];

                priceInformationList.forEach( pi => {
                    let price = {};
                    price.priceSubSource = pi.pricingSubsource;
                    price.distributionModel = pi.distributionModel;
                    price.lastTicketDate = pi.fare.lastTicketDate;
                    price.lastTicketTime = pi.fare.lastTicketTime;
                    price.totalFareDetail = pi.fare.totalFare;

                    

                    //passenger list code starts here
                    price.passengerList = pi.fare.passengerInfoList.map( passenger => {
                        passengerDetail = {};
                        passengerDetail.type = passenger.passengerInfo.passengerType;
                        passengerDetail.total = passenger.passengerInfo.passengerNumber;
                        passengerDetail.refundable = passenger.passengerInfo.refundable;
                        passengerDetail.nonRefundable = passenger.passengerInfo.nonRefundable;
                        let passengerFareComponentList = passenger.passengerInfo.fareComponents;


                        // passenger fare components
                        passengerDetail.FareComponents = passengerFareComponentList.map( pfc => {
                        
                            let fareComponentDetail = mappedFareComponent[pfc.ref];

                            return { 
                                beginAirport : pfc.beginAirport, 
                                endAirport : pfc.endAirport,
                                segments : pfc.segments,
                                fareComponentDetail :fareComponentDetail
                            }
                        })

                        //passenger taxes
                        passengerDetail.taxes = passenger.passengerInfo.taxes.map( tax => {
                            return mappedTax[tax.ref];
                        })
                        

                        passengerDetail.taxSummary = passenger.passengerInfo.taxSummaries.map( summary => {
                            return mappedTaxSummary[summary.ref];
                        })

                        
                        // console.log(passenger.passengerInfo.obFees);
                        passengerDetail.obFees = passenger.passengerInfo.obFees?.map( of => {
                            return mappedObFees[of.ref];
                        })

                        passengerDetail.baggageInformation = passenger.passengerInfo.baggageInformation.map( bi =>{
                            let baggageDetail = {};
                            baggageDetail.baggageProvision = bi.provisionType;
                            baggageDetail.airlineCode = bi.airlineCode;
                            baggageDetail.segments = bi.segments;
                            baggageDetail.detail = mappedBaggages[bi.allowance.ref];

                            return baggageDetail;
                        });

                        passengerDetail.currencyConversion = passenger.passengerInfo.currencyConversion;

                        passengerDetail.passengerTotalFare = passenger.passengerInfo.passengerTotalFare;
                        
                        passengerDetail.currencyConversion = passenger.passengerInfo.currencyConversion;


                        return passengerDetail;

                    })

                    priceDetail.push(price);

                })

                // console.log("Here is detail -------------------------------------");
                // console.log( priceDetail[0][0].fare.passengerInfoList[0].passengerInfo.taxes );
                // // price.passengerList
                // throw '';
                return {priceSource : priceSource, legIds : legIds , legList : legDetail , passengerPriceDetail : priceDetail };
            });

            itineraryGroupDetail.push({ description : groupDescription , itinerariesList : itinerariesList });
       });


    return response.status(200).json({data : itineraryGroupDetail});
    //    console.log(itineraryGroupDetail);

        // let fares = flightDetail.data.groupedItineraryResponse.fareComponentDescs;
        // let lhFlights = flights.filter( flight => {
        //     return flight.carrier.marketing == "LH";
        // })
        // let lhFares = fares.filter( fare => {
        //     return fare.governingCarrier == "LH";
        // })
        // flightCodes = flights.map( flight => flight.carrier.marketing);
        // fareFlightCodes = fares.map(fare => fare.governingCarrier);
        // flightCodes = [...new Set(flightCodes)]
        // fareFlightCodes = [...new Set(fareFlightCodes)]
        // console.log(lhFlights[0]);
        // console.log(lhFares[0].segments);
        // console.log(flightCodes);
        // console.log(fareFlightCodes)


        // [
        //     {
        //       id: 3,
        //       frequency: 'S****FS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 398,
        //       elapsedTime: 80,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '14:55:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '16:15:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1716,
        //         operating: 'LH',
        //         operatingFlightNumber: 1716,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 6,
        //       frequency: '*M*W*F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 95,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '13:10:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '14:45:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1613,
        //         operating: 'LH',
        //         operatingFlightNumber: 1613,
        //         disclosure: 'CL',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 8,
        //       frequency: 'SMTWTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 558,
        //       elapsedTime: 110,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '19:25:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '21:15:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1351,
        //         operating: 'LH',
        //         operatingFlightNumber: 1351,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 10,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 558,
        //       elapsedTime: 110,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '14:20:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '16:10:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1349,
        //         operating: 'LH',
        //         operatingFlightNumber: 1349,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 11,
        //       frequency: 'S*TWTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 398,
        //       elapsedTime: 85,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '10:15:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '11:40:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5992,
        //         operating: 'OU',
        //         operatingFlightNumber: 4439,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 12,
        //       frequency: 'S**WTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 95,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '06:00:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '07:35:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1617,
        //         operating: 'LH',
        //         operatingFlightNumber: 1617,
        //         disclosure: 'CL',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 14,
        //       frequency: 'S*T*TF*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 558,
        //       elapsedTime: 110,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '09:40:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '11:30:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1347,
        //         operating: 'LH',
        //         operatingFlightNumber: 1347,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 16,
        //       frequency: '****TF*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 458,
        //       elapsedTime: 80,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '18:00:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '19:20:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 6006,
        //         operating: 'OU',
        //         operatingFlightNumber: 411,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 17,
        //       frequency: '*MT**F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 95,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '08:25:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '10:00:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1611,
        //         operating: 'LH',
        //         operatingFlightNumber: 1611,
        //         disclosure: 'CL',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 18,
        //       frequency: '*****FS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 458,
        //       elapsedTime: 90,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '10:05:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '11:35:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 6000,
        //         operating: 'OU',
        //         operatingFlightNumber: 417,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 21,
        //       frequency: '*M*WTF*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 558,
        //       elapsedTime: 110,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '06:40:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '08:30:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1353,
        //         operating: 'LH',
        //         operatingFlightNumber: 1353,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 22,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 271,
        //       elapsedTime: 65,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '20:15:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '21:20:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1730,
        //         operating: 'LH',
        //         operatingFlightNumber: 1730,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 23,
        //       trafficRestriction: 'G',
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 154,
        //       elapsedTime: 45,
        //       departure: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '15:05:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '15:50:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5974,
        //         operating: 'OU',
        //         operatingFlightNumber: 658,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 25,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 271,
        //       elapsedTime: 65,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '11:30:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '12:35:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1726,
        //         operating: 'LH',
        //         operatingFlightNumber: 1726,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 26,
        //       trafficRestriction: 'G',
        //       frequency: '***W*F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 154,
        //       elapsedTime: 45,
        //       departure: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '22:05:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '22:50:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5970,
        //         operating: 'OU',
        //         operatingFlightNumber: 656,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 29,
        //       frequency: 'S**WTF*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 458,
        //       elapsedTime: 85,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '12:50:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '14:15:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1406,
        //         operating: 'LH',
        //         operatingFlightNumber: 1406,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 32,
        //       frequency: 'S**W*FS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 458,
        //       elapsedTime: 85,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '22:15:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '23:40:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1404,
        //         operating: 'LH',
        //         operatingFlightNumber: 1404,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 33,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 100,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '07:35:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '09:15:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5721,
        //         operating: 'LO',
        //         operatingFlightNumber: 351,
        //         disclosure: 'LO',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 34,
        //       frequency: '****TF*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 580,
        //       elapsedTime: 95,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '12:05:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '13:40:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 6004,
        //         operating: 'OU',
        //         operatingFlightNumber: 413,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 39,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 398,
        //       elapsedTime: 80,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '09:10:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '10:30:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1718,
        //         operating: 'LH',
        //         operatingFlightNumber: 1718,
        //         disclosure: 'CL',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 41,
        //       frequency: '**TW*FS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 271,
        //       elapsedTime: 60,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '08:55:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '09:55:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5988,
        //         operating: 'OU',
        //         operatingFlightNumber: 4437,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 43,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 100,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '17:10:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '18:50:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5723,
        //         operating: 'LO',
        //         operatingFlightNumber: 353,
        //         disclosure: 'LO',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 48,
        //       frequency: 'S**W*F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 60,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '09:00:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '10:00:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 99,
        //         operating: 'LH',
        //         operatingFlightNumber: 99,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 49,
        //       trafficRestriction: 'G',
        //       frequency: 'SMT**F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 154,
        //       elapsedTime: 50,
        //       departure: {
        //         airport: 'ZAG',
        //         city: 'ZAG',
        //         country: 'HR',
        //         time: '14:40:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'SPU',
        //         city: 'SPU',
        //         country: 'HR',
        //         time: '15:30:00+02:00'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 5976,
        //         operating: 'OU',
        //         operatingFlightNumber: 380,
        //         disclosure: 'OU',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 51,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 484,
        //       elapsedTime: 95,
        //       departure: {
        //         airport: 'WAW',
        //         city: 'WAW',
        //         country: 'PL',
        //         time: '17:00:00+02:00'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '18:35:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 1615,
        //         operating: 'LH',
        //         operatingFlightNumber: 1615,
        //         disclosure: 'CL',
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 54,
        //       frequency: 'SMTWTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 60,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '10:00:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '11:00:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 101,
        //         operating: 'LH',
        //         operatingFlightNumber: 101,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 56,
        //       frequency: 'SMTWTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 55,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '10:15:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '11:10:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 100,
        //         operating: 'LH',
        //         operatingFlightNumber: 100,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 57,
        //       frequency: 'SMTWTFS',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 55,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '09:45:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '10:40:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 102,
        //         operating: 'LH',
        //         operatingFlightNumber: 102,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 61,
        //       frequency: '*****F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 60,
        //       departure: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '08:30:00+02:00',
        //         terminal: '2'
        //       },
        //       arrival: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '09:30:00+02:00',
        //         terminal: '1'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 97,
        //         operating: 'LH',
        //         operatingFlightNumber: 97,
        //         equipment: [Object]
        //       }
        //     },
        //     {
        //       id: 62,
        //       frequency: 'S*TW*F*',
        //       stopCount: 0,
        //       eTicketable: true,
        //       totalMilesFlown: 186,
        //       elapsedTime: 55,
        //       departure: {
        //         airport: 'FRA',
        //         city: 'FRA',
        //         country: 'DE',
        //         time: '12:15:00+02:00',
        //         terminal: '1'
        //       },
        //       arrival: {
        //         airport: 'MUC',
        //         city: 'MUC',
        //         country: 'DE',
        //         time: '13:10:00+02:00',
        //         terminal: '2'
        //       },
        //       carrier: {
        //         marketing: 'LH',
        //         marketingFlightNumber: 104,
        //         operating: 'LH',
        //         operatingFlightNumber: 104,
        //         equipment: [Object]
        //       }
        //     }
        //   ]
        //   [
        //     {
        //       id: 1,
        //       governingCarrier: 'LH',
        //       fareAmount: 119.4,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'K02CLSE9',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 493,
        //       publishedFareCurrency: 'PLN',
        //       directionality: 'FROM',
        //       applicablePricingCategories: '5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '00',
        //       fareType: 'XPL',
        //       fareTariff: '21',
        //       fareRule: 'ZCET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object], [Object] ]
        //     },
        //     {
        //       id: 2,
        //       governingCarrier: 'LH',
        //       fareAmount: 77.26,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'K02LGTU9/DXEU',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 319,
        //       publishedFareCurrency: 'PLN',
        //       privateFare: true,
        //       directionality: 'FROM',
        //       applicablePricingCategories: '1 4 5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '08',
        //       fareType: 'EOU',
        //       fareTariff: '916',
        //       fareRule: 'XLET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object], [Object] ]
        //     },
        //     {
        //       id: 5,
        //       governingCarrier: 'LH',
        //       fareAmount: 148.23,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'TETCLSE9',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 612,
        //       publishedFareCurrency: 'PLN',
        //       directionality: 'FROM',
        //       applicablePricingCategories: '5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '00',
        //       fareType: 'XPX',
        //       fareTariff: '21',
        //       fareRule: 'ZCET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object] ]
        //     },
        //     {
        //       id: 6,
        //       governingCarrier: 'LH',
        //       fareAmount: 77.26,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'K02LGTU9/DXEU',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 319,
        //       publishedFareCurrency: 'PLN',
        //       privateFare: true,
        //       directionality: 'FROM',
        //       applicablePricingCategories: '1 4 5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '08',
        //       fareType: 'EOU',
        //       fareTariff: '916',
        //       fareRule: 'XLET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object] ]
        //     },
        //     {
        //       id: 9,
        //       governingCarrier: 'LH',
        //       fareAmount: 148.23,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'TETCLSE9',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 612,
        //       publishedFareCurrency: 'PLN',
        //       directionality: 'FROM',
        //       applicablePricingCategories: '5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '00',
        //       fareType: 'XPX',
        //       fareTariff: '21',
        //       fareRule: 'ZCET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object], [Object] ]
        //     },
        //     {
        //       id: 11,
        //       governingCarrier: 'LH',
        //       fareAmount: 119.4,
        //       fareCurrency: 'NUC',
        //       fareBasisCode: 'K02CLSE9',
        //       farePassengerType: 'ADT',
        //       publishedFareAmount: 493,
        //       publishedFareCurrency: 'PLN',
        //       directionality: 'FROM',
        //       applicablePricingCategories: '5 8 9 12 15 16 17 31 33',
        //       vendorCode: 'ATP',
        //       fareTypeBitmap: '00',
        //       fareType: 'XPL',
        //       fareTariff: '21',
        //       fareRule: 'ZCET',
        //       cabinCode: 'Y',
        //       segments: [ [Object], [Object] ]
        //     }
        //   ]


        // let form = new FormData()

        // form.append('user' , 'Nouman');
        // form.append('lastname' , 'Riaz');

        // console.log(form);


    },
    testSocketPage : (request ,response) =>{
        
        filePath = path.join(__dirname,'..','public', 'views' , 'index.html' );
        response.sendFile(filePath);
    },
    createPDF : async (request , response)=> {
        const invoiceTemplate =  path.join(__dirname, '../public/views/invoice.ejs');
        const data = {
            username : "nouman",
            email : "mnoumanb@gmail.com"
        }
        const html = await ejs.renderFile(invoiceTemplate, data);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'load' });
        const pdfPath = path.join(__dirname, '../public/uploads/invoices/test.pdf');
        await page.pdf({ path: pdfPath, format: 'A4' });
        await browser.close();

        return response.status(200).json({ status : true , data : invoiceTemplate});
    }
}