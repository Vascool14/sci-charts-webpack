import React, { createContext, useState } from 'react';
import { ContextInterface, StateInterface}  from './types';
import turnCSVToObject from './utils/turnCSVToObject';

// mock an API call in a real-world scenario, this would be an API call in the useEffect hook of the component
var CSVData = `Entity,Code,Year,Number of patents in electric vehicle machine technology,Number of patents in electric vehicle storage,Number of patents in electric vehicle management,Number of patents in electric vehicle communication technology,Number of patents in electric vehicle charging stations
    Africa,,2001,3,,3,1,2
    Africa,,2003,1,2,1,,
    Africa,,2004,3,4,2,1,4
    Africa,,2005,2,,,2,1
    Africa,,2006,2,5,4,5,5
    Africa,,2007,9,11,9,3,7
    Africa,,2008,4,2,2,2,1
    Africa,,2009,1,5,3,,4
    Africa,,2010,4,8,3,1,5
    Africa,,2011,18,18,13,5,32
    Africa,,2012,20,24,9,5,26
    Africa,,2013,12,13,8,5,7
    Africa,,2014,14,15,4,5,20
    Africa,,2015,13,11,7,4,12
    Africa,,2016,5,5,,2,7
    Africa,,2017,5,6,2,3,6
    Africa,,2018,15,23,7,8,29
    Africa,,2019,7,11,3,5,14
    Africa,,2021,2,3,1,,2
    Africa,,2002,,1,2,,1
    Africa,,2020,,4,2,,3
    Africa,,2000,,,2,1,1
    Argentina,ARG,2003,2,3,,1,4
    Argentina,ARG,2006,1,1,,1,3
    Argentina,ARG,2009,6,10,1,,6
    Argentina,ARG,2010,14,17,5,11,32
    Argentina,ARG,2011,1,3,,,1
    Argentina,ARG,2012,1,4,,,4
    Argentina,ARG,2013,3,5,2,2,6
    Argentina,ARG,2015,2,2,1,1,2
    Argentina,ARG,2016,1,1,,,1
    Argentina,ARG,2017,2,9,2,3,3
    Argentina,ARG,2018,2,2,,2,4
    Argentina,ARG,2019,1,1,1,1,1
    Argentina,ARG,2000,,1,,,1
    Argentina,ARG,2001,,2,,3,1
    Argentina,ARG,2002,,1,,,1
    Argentina,ARG,2007,,1,,,1
    Argentina,ARG,2008,,1,,,
    Argentina,ARG,2005,,,1,,
    Asia,,2000,343,514,393,68,417
    Asia,,2001,398,620,436,98,443
    Asia,,2002,427,678,496,89,525
    Asia,,2003,567,770,654,117,741
    Asia,,2004,543,804,601,105,720
    Asia,,2005,710,1012,695,124,683
    Asia,,2006,1166,1780,1031,201,1041
    Asia,,2007,1483,1884,1202,282,1163
    Asia,,2008,1781,2340,1305,435,1502
    Asia,,2009,1866,2864,1413,452,1932
    Asia,,2010,2497,4125,1802,813,2929
    Asia,,2011,3437,5991,2721,1313,4100
    Asia,,2012,3534,6046,2726,1419,4223
    Asia,,2013,3117,5650,2405,1062,3619
    Asia,,2014,3164,5732,2558,1164,3742
    Asia,,2015,2977,6149,2515,1109,3765
    Asia,,2016,3818,8668,2992,1605,6657
    Asia,,2017,5396,12395,3498,2186,10833
    Asia,,2018,7451,14072,3771,2724,16106
    Asia,,2019,8657,17427,3778,3138,20183
    Asia,,2020,7262,16802,2745,2396,20152
    Asia,,2021,2287,5570,879,852,6823
    Australia,AUS,2000,31,33,27,11,33
    Australia,AUS,2001,37,61,27,14,47
    Australia,AUS,2002,30,46,18,11,29
    Australia,AUS,2003,76,100,46,13,80
    Australia,AUS,2004,12,18,12,4,20
    Australia,AUS,2005,22,29,27,8,28
    Australia,AUS,2006,27,27,21,8,28
    Australia,AUS,2007,33,31,18,6,33
    Australia,AUS,2008,26,42,22,9,38
    Australia,AUS,2009,41,57,36,20,60
    Australia,AUS,2010,70,77,33,17,89
    Australia,AUS,2011,72,85,56,20,81
    Australia,AUS,2012,101,101,51,49,145
    Australia,AUS,2013,50,65,28,18,60
    Australia,AUS,2014,47,51,33,20,53
    Australia,AUS,2015,39,53,20,16,43
    Australia,AUS,2016,35,53,23,16,55
    Australia,AUS,2017,56,72,37,22,84
    Australia,AUS,2018,70,111,29,36,141
    Australia,AUS,2019,63,112,23,22,131
    Australia,AUS,2020,40,75,20,15,90
    Australia,AUS,2021,30,41,18,12,54
    Austria,AUT,2000,15,20,19,3,12
    Austria,AUT,2001,21,27,14,6,19
    Austria,AUT,2002,27,35,17,7,26
    Austria,AUT,2003,31,35,18,6,29
    Austria,AUT,2004,16,19,7,2,14
    Austria,AUT,2005,21,19,13,2,17
    Austria,AUT,2006,36,41,28,7,38
    Austria,AUT,2007,47,55,37,2,37
    Austria,AUT,2008,37,49,27,14,39
    Austria,AUT,2009,35,42,16,7,29
    Austria,AUT,2010,24,28,10,5,25
    Austria,AUT,2011,6,11,1,1,9
    Austria,AUT,2012,9,15,9,2,7
    Austria,AUT,2013,4,5,1,,4
    Austria,AUT,2014,5,7,1,4,10
    Austria,AUT,2015,7,7,4,2,7
    Austria,AUT,2016,9,7,2,1,9
    Austria,AUT,2017,7,11,2,1,15
    Austria,AUT,2018,5,12,,,11
    Austria,AUT,2019,5,10,7,,5
    Austria,AUT,2020,,2,1,1,2
    Belgium,BEL,2009,1,1,2,,4
    Belgium,BEL,2011,2,2,1,1,5
    Belgium,BEL,2013,1,1,1,1,1
    Belgium,BEL,2014,1,1,2,,2
    Belgium,BEL,2017,2,2,,1,4
    Belgium,BEL,2018,3,5,1,1,8
    Belgium,BEL,2019,4,3,1,1,5
    Belgium,BEL,2020,2,4,,1,6
    Belgium,BEL,2000,,1,,,2
    Belgium,BEL,2008,,1,,,1
    Belgium,BEL,2016,,2,,,
    Belgium,BEL,2012,,,1,,
    Brazil,BRA,2000,5,5,4,1,2
    Brazil,BRA,2001,5,9,4,7,6
    Brazil,BRA,2002,7,10,3,2,5
    Brazil,BRA,2003,16,15,11,5,13
    Brazil,BRA,2004,8,10,8,2,11
    Brazil,BRA,2005,15,18,13,2,13
    Brazil,BRA,2006,27,29,18,6,25
    Brazil,BRA,2007,34,43,33,10,44
    Brazil,BRA,2008,46,51,24,12,47
    Brazil,BRA,2009,50,60,26,10,64
    Brazil,BRA,2010,100,132,56,30,132
    Brazil,BRA,2011,86,118,53,32,115
    Brazil,BRA,2012,74,103,46,34,112
    Brazil,BRA,2013,78,90,42,21,90
    Brazil,BRA,2014,57,70,30,29,84
    Brazil,BRA,2015,48,67,47,15,61
    Brazil,BRA,2016,53,84,35,19,79
    Brazil,BRA,2017,47,86,45,16,79
    Brazil,BRA,2018,49,77,32,24,82
    Brazil,BRA,2019,48,66,22,13,72
    Brazil,BRA,2020,5,13,8,,10
    Brazil,BRA,2021,1,2,1,,1
    Bulgaria,BGR,2001,1,,,,
    Bulgaria,BGR,2012,1,1,,,1
    Bulgaria,BGR,2013,2,,,,1
    Bulgaria,BGR,2014,2,,,,
    Bulgaria,BGR,2015,1,,,,
    Bulgaria,BGR,2016,1,,,,
    Bulgaria,BGR,2005,,,1,,
    Bulgaria,BGR,2011,,,,,2
    Bulgaria,BGR,2018,,,,,1
    Canada,CAN,2000,34,40,32,10,28
    Canada,CAN,2001,38,48,30,12,26
    Canada,CAN,2002,49,56,29,8,39
    Canada,CAN,2003,32,40,29,11,35
    Canada,CAN,2004,21,34,19,4,35
    Canada,CAN,2005,43,60,43,5,37
    Canada,CAN,2006,51,65,38,13,50
    Canada,CAN,2007,58,75,45,18,59
    Canada,CAN,2008,58,88,43,24,66
    Canada,CAN,2009,55,76,43,25,85
    Canada,CAN,2010,89,123,42,30,125
    Canada,CAN,2011,86,114,39,33,111
    Canada,CAN,2012,112,157,62,69,182
    Canada,CAN,2013,92,126,45,33,123
    Canada,CAN,2014,120,133,63,49,162
    Canada,CAN,2015,113,153,55,41,147
    Canada,CAN,2016,93,141,43,28,144
    Canada,CAN,2017,114,159,50,40,158
    Canada,CAN,2018,94,138,35,38,164
    Canada,CAN,2019,103,171,35,50,188
    Canada,CAN,2020,38,84,18,17,79
    Canada,CAN,2021,4,14,3,2,11
    Chile,CHL,2008,1,,1,,
    Chile,CHL,2010,2,2,,,5
    Chile,CHL,2011,4,3,4,2,6
    Chile,CHL,2012,14,15,9,4,21
    Chile,CHL,2013,5,8,5,2,5
    Chile,CHL,2014,4,2,1,2,4
    Chile,CHL,2015,1,2,1,1,1
    Chile,CHL,2016,5,8,,2,8
    Chile,CHL,2017,5,4,4,3,6
    Chile,CHL,2018,3,4,1,3,10
    Chile,CHL,2019,4,6,3,4,7
    Chile,CHL,2020,4,8,1,3,10
    Chile,CHL,2021,2,2,,,3
    Chile,CHL,2007,,,1,,
    China,CHN,2000,38,58,48,12,55
    China,CHN,2001,46,70,40,18,47
    China,CHN,2002,49,87,47,9,51
    China,CHN,2003,106,145,98,30,117
    China,CHN,2004,86,177,100,30,148
    China,CHN,2005,182,221,155,23,181
    China,CHN,2006,346,509,288,69,337
    China,CHN,2007,486,634,332,86,444
    China,CHN,2008,676,822,420,160,614
    China,CHN,2009,649,913,415,128,709
    China,CHN,2010,951,1336,589,239,1136
    China,CHN,2011,1406,2151,989,469,1715
    China,CHN,2012,1540,2275,1093,513,1768
    China,CHN,2013,1429,2301,1012,447,1706
    China,CHN,2014,1464,2351,1145,507,1822
    China,CHN,2015,1484,3207,1238,612,2041
    China,CHN,2016,2238,5535,1713,1076,4332
    China,CHN,2017,3578,9250,2304,1614,8318
    China,CHN,2018,4898,10485,2308,1914,12445
    China,CHN,2019,6611,13904,2513,2216,16627
    China,CHN,2020,6509,15413,2297,2069,18742
    China,CHN,2021,2148,5292,824,795,6508
    Colombia,COL,2010,2,2,,,4
    Colombia,COL,2011,1,1,,,2
    Colombia,COL,2012,5,4,1,1,7
    Colombia,COL,2013,4,4,3,2,5
    Colombia,COL,2014,1,1,,,2
    Colombia,COL,2017,1,1,,,2
    Colombia,COL,2018,3,4,1,2,8
    Colombia,COL,2019,1,2,,4,4
    Colombia,COL,2020,1,3,1,1,5
    Colombia,COL,2021,3,4,,,4
    Costa Rica,CRI,2013,,1,,,
    Costa Rica,CRI,2014,,1,,,
    Costa Rica,CRI,2018,,1,,2,2
    Croatia,HRV,2001,1,1,,,1
    Croatia,HRV,2007,1,1,1,,1
    Croatia,HRV,2012,1,1,,1,2
    Croatia,HRV,2016,2,3,3,1,3
    Croatia,HRV,2017,2,4,,1,3
    Croatia,HRV,2018,4,7,3,3,6
    Croatia,HRV,2020,3,1,2,,1
    Croatia,HRV,2015,,1,,,
    Croatia,HRV,2019,,3,2,,2
    Croatia,HRV,2021,,4,1,2,2
    Croatia,HRV,2008,,,,,1
    Croatia,HRV,2013,,,,,1
    Cuba,CUB,2012,1,1,,,2
    Cyprus,CYP,2012,1,1,,1,2
    Cyprus,CYP,2013,2,2,,,3
    Cyprus,CYP,2016,2,2,1,1,3
    Cyprus,CYP,2018,2,4,2,1,1
    Cyprus,CYP,2019,1,2,,1,2
    Cyprus,CYP,2015,,1,,,
    Czechia,CZE,2000,6,2,7,,2
    Czechia,CZE,2001,3,2,2,3,1
    Czechia,CZE,2010,1,4,,,5
    Czechia,CZE,2011,1,3,,,2
    Czechia,CZE,2013,1,5,,,2
    Czechia,CZE,2014,2,4,3,,2
    Czechia,CZE,2018,2,7,1,,8
    Czechia,CZE,2019,7,11,,,17
    Czechia,CZE,2020,3,5,,2,6
    Czechia,CZE,2021,1,2,,,2
    Czechia,CZE,2002,,3,,1,1
    Czechia,CZE,2007,,1,,,
    Czechia,CZE,2008,,5,2,,
    Czechia,CZE,2009,,3,1,,2
    Czechia,CZE,2015,,1,,,3
    Czechia,CZE,2017,,2,,,3
    Czechia,CZE,2004,,,,,1
    Czechia,CZE,2005,,,,,1
    Czechia,CZE,2012,,,,,2
    Czechia,CZE,2016,,,,,2
    Denmark,DNK,2000,4,4,6,1,2
    Denmark,DNK,2001,1,3,2,,
    Denmark,DNK,2003,7,9,2,2,11
    Denmark,DNK,2004,4,4,,3,6
    Denmark,DNK,2005,1,2,,,3
    Denmark,DNK,2006,4,5,2,2,4
    Denmark,DNK,2007,2,3,1,,1
    Denmark,DNK,2008,4,7,3,1,3
    Denmark,DNK,2009,12,20,9,10,28
    Denmark,DNK,2010,26,29,11,11,54
    Denmark,DNK,2011,23,32,7,12,47
    Denmark,DNK,2012,18,22,9,8,23
    Denmark,DNK,2013,24,33,13,13,32
    Denmark,DNK,2014,15,21,10,6,32
    Denmark,DNK,2015,13,15,6,7,17
    Denmark,DNK,2016,10,16,2,3,21
    Denmark,DNK,2017,8,12,6,3,14
    Denmark,DNK,2018,7,11,4,6,18
    Denmark,DNK,2020,1,5,1,,2
    Denmark,DNK,2021,1,3,1,,6
    Denmark,DNK,2002,,2,,,
    Denmark,DNK,2019,,3,,,
    Dominican Republic,DOM,2012,1,1,,,2
    Dominican Republic,DOM,2019,,1,,2,2
    Dominican Republic,DOM,2017,,,,,1
    Ecuador,ECU,2014,1,1,,,2
    Ecuador,ECU,2020,1,1,,,1
    Ecuador,ECU,2019,,1,,3,2
    Ecuador,ECU,2018,,,,,1
    Egypt,EGY,2007,2,3,1,,1
    Egypt,EGY,2011,1,1,,,2
    Egypt,EGY,2012,1,1,,,2
    Egypt,EGY,2008,,,,1,
    Egypt,EGY,2001,,,,,1
    El Salvador,SLV,2017,,,,,1
    Estonia,EST,2000,1,,,,
    Estonia,EST,2002,,1,,,
    Europe,,2000,234,280,214,37,206
    Europe,,2001,245,325,187,59,188
    Europe,,2002,307,359,195,42,254
    Europe,,2003,317,382,220,60,289
    Europe,,2004,235,319,168,43,253
    Europe,,2005,309,362,232,40,269
    Europe,,2006,399,477,321,56,388
    Europe,,2007,491,573,369,64,411
    Europe,,2008,575,678,356,147,525
    Europe,,2009,641,902,359,179,842
    Europe,,2010,1001,1318,572,288,1324
    Europe,,2011,1042,1566,650,335,1442
    Europe,,2012,1197,1690,743,393,1478
    Europe,,2013,1123,1657,710,382,1372
    Europe,,2014,1038,1550,671,342,1290
    Europe,,2015,979,1577,560,306,1302
    Europe,,2016,989,1542,562,302,1350
    Europe,,2017,1331,2065,655,395,1928
    Europe,,2018,1449,2429,683,440,2286
    Europe,,2019,1394,2593,624,406,2297
    Europe,,2020,638,1320,348,219,1081
    Europe,,2021,108,256,62,50,202
    European Union (27),,2000,211,263,191,31,189
    European Union (27),,2001,221,297,164,52,172
    European Union (27),,2002,281,330,181,36,233
    European Union (27),,2003,288,349,199,53,265
    European Union (27),,2004,208,283,142,38,213
    European Union (27),,2005,274,319,196,31,238
    European Union (27),,2006,347,429,270,45,349
    European Union (27),,2007,432,507,299,52,354
    European Union (27),,2008,486,584,287,122,438
    European Union (27),,2009,566,804,295,157,740
    European Union (27),,2010,885,1175,468,254,1181
    European Union (27),,2011,917,1413,548,292,1286
    European Union (27),,2012,1056,1502,662,353,1277
    European Union (27),,2013,976,1484,614,333,1192
    European Union (27),,2014,890,1359,553,277,1096
    European Union (27),,2015,801,1342,453,236,1091
    European Union (27),,2016,843,1339,456,246,1173
    European Union (27),,2017,1180,1862,554,325,1729
    European Union (27),,2018,1296,2199,607,368,2022
    European Union (27),,2019,1303,2427,558,370,2125
    European Union (27),,2020,576,1190,290,196,964
    European Union (27),,2021,106,239,53,47,197
    Finland,FIN,2002,1,1,1,,1
    Finland,FIN,2006,1,2,1,1,3
    Finland,FIN,2007,2,2,1,,1
    Finland,FIN,2009,1,3,1,,2
    Finland,FIN,2010,4,9,4,,10
    Finland,FIN,2011,1,2,1,,1
    Finland,FIN,2013,2,1,2,,1
    Finland,FIN,2014,1,2,,,3
    Finland,FIN,2015,3,10,1,,11
    Finland,FIN,2016,7,7,,,8
    Finland,FIN,2017,5,7,,1,7
    Finland,FIN,2018,2,9,1,3,14
    Finland,FIN,2019,4,15,2,7,22
    Finland,FIN,2020,2,5,3,1,10
    Finland,FIN,2000,,2,,,1
    Finland,FIN,2003,,1,1,1,
    Finland,FIN,2005,,3,,,1
    Finland,FIN,2008,,3,1,,
    Finland,FIN,2021,,1,,,
    Finland,FIN,2004,,,1,1,
    Finland,FIN,2012,,,2,,
    France,FRA,2000,26,29,17,5,25
    France,FRA,2001,20,26,13,2,16
    France,FRA,2002,29,36,15,1,23
    France,FRA,2003,19,25,9,2,16
    France,FRA,2004,18,40,11,5,28
    France,FRA,2005,27,40,21,4,28
    France,FRA,2006,30,44,28,4,29
    France,FRA,2007,37,54,22,1,25
    France,FRA,2008,48,70,19,9,52
    France,FRA,2009,72,118,25,16,103
    France,FRA,2010,83,157,42,25,150
    France,FRA,2011,144,207,71,46,201
    France,FRA,2012,151,196,91,35,170
    France,FRA,2013,121,173,79,25,153
    France,FRA,2014,86,123,62,20,98
    France,FRA,2015,71,105,32,21,96
    France,FRA,2016,66,99,34,20,102
    France,FRA,2017,90,142,42,13,116
    France,FRA,2018,89,174,50,19,107
    France,FRA,2019,122,249,44,26,197
    France,FRA,2020,52,68,23,10,57
    France,FRA,2021,3,8,1,1,6
    Georgia,GEO,2010,1,1,,,2
    Germany,DEU,2000,128,178,111,18,123
    Germany,DEU,2001,142,194,107,28,112
    Germany,DEU,2002,192,210,128,24,153
    Germany,DEU,2003,175,214,131,33,153
    Germany,DEU,2004,135,179,106,14,120
    Germany,DEU,2005,194,223,142,25,159
    Germany,DEU,2006,224,286,182,22,227
    Germany,DEU,2007,293,333,201,42,239
    Germany,DEU,2008,342,367,195,76,267
    Germany,DEU,2009,378,505,206,96,466
    Germany,DEU,2010,614,772,324,162,704
    Germany,DEU,2011,633,960,404,178,830
    Germany,DEU,2012,722,1072,470,243,871
    Germany,DEU,2013,704,1067,455,234,820
    Germany,DEU,2014,675,1020,409,194,761
    Germany,DEU,2015,618,1022,354,176,818
    Germany,DEU,2016,677,1054,377,199,906
    Germany,DEU,2017,987,1501,442,263,1420
    Germany,DEU,2018,1071,1747,490,292,1627
    Germany,DEU,2019,1101,2006,486,319,1752
    Germany,DEU,2020,489,1048,253,173,823
    Germany,DEU,2021,94,210,48,43,168
    Greece,GRC,2000,1,2,1,,
    Greece,GRC,2007,1,,,,1
    Greece,GRC,2008,,1,,,1
    Greece,GRC,2009,,1,,,3
    Greece,GRC,2006,,,,,1
    Greece,GRC,2010,,,,,2
    Greece,GRC,2011,,,,,3
    Greece,GRC,2013,,,,,1
    Guatemala,GTM,2012,1,1,,,2
    Guatemala,GTM,2017,,,,,1
    High-income countries,,2000,850,1115,774,162,864
    High-income countries,,2001,908,1280,794,208,839
    High-income countries,,2002,1053,1437,917,212,1042
    High-income countries,,2003,1165,1557,1064,232,1319
    High-income countries,,2004,995,1410,880,173,1165
    High-income countries,,2005,1249,1803,1099,227,1172
    High-income countries,,2006,1757,2571,1463,293,1628
    High-income countries,,2007,2209,2838,1741,424,1903
    High-income countries,,2008,2572,3310,1753,665,2230
    High-income countries,,2009,2820,4164,1870,790,3213
    High-income countries,,2010,3732,5931,2463,1279,4646
    High-income countries,,2011,4779,7985,3426,1836,6080
    High-income countries,,2012,5083,8167,3544,2089,6425
    High-income countries,,2013,4465,7655,3141,1675,5434
    High-income countries,,2014,4414,7625,3017,1657,5388
    High-income countries,,2015,4050,7227,2717,1416,5082
    High-income countries,,2016,4284,7540,2721,1505,6162
    High-income countries,,2017,5035,8346,2881,1665,7108
    High-income countries,,2018,5885,9163,3077,1998,8743
    High-income countries,,2019,5483,9645,2886,2214,9154
    High-income countries,,2020,2501,4910,1445,1138,4476
    High-income countries,,2021,617,1278,298,310,1220
    Hong Kong,HKG,2001,2,1,3,2,2
    Hong Kong,HKG,2002,6,8,3,2,6
    Hong Kong,HKG,2003,8,6,3,2,8
    Hong Kong,HKG,2004,3,2,1,,
    Hong Kong,HKG,2005,5,7,2,3,7
    Hong Kong,HKG,2006,4,8,3,2,7
    Hong Kong,HKG,2007,1,1,,,
    Hong Kong,HKG,2008,9,12,6,2,6
    Hong Kong,HKG,2009,14,9,4,1,10
    Hong Kong,HKG,2010,3,5,4,4,4
    Hong Kong,HKG,2011,6,27,11,,10
    Hong Kong,HKG,2012,6,9,1,3,12
    Hong Kong,HKG,2013,12,15,8,6,14
    Hong Kong,HKG,2014,11,16,7,3,10
    Hong Kong,HKG,2015,47,52,24,12,77
    Hong Kong,HKG,2016,27,34,10,5,40
    Hong Kong,HKG,2017,1,4,3,1,3
    Hong Kong,HKG,2018,21,41,10,12,48
    Hong Kong,HKG,2019,2,4,3,3,6
    Hong Kong,HKG,2000,,2,,,2
    Hungary,HUN,2000,1,,,,1
    Hungary,HUN,2001,2,2,2,4,1
    Hungary,HUN,2004,3,1,2,1,2
    Hungary,HUN,2005,1,1,3,,2
    Hungary,HUN,2010,5,12,3,1,7
    Hungary,HUN,2011,4,9,,4,11
    Hungary,HUN,2012,8,8,3,1,4
    Hungary,HUN,2013,3,13,4,5,5
    Hungary,HUN,2014,7,17,8,4,13
    Hungary,HUN,2015,3,20,6,2,4
    Hungary,HUN,2016,2,15,2,,4
    Hungary,HUN,2017,6,20,8,4,10
    Hungary,HUN,2018,2,8,2,1,7
    Hungary,HUN,2002,,2,,,2
    Hungary,HUN,2008,,3,2,,1
    Hungary,HUN,2009,,1,,,1
    Hungary,HUN,2019,,3,1,1,
    Hungary,HUN,2020,,3,,,
    India,IND,2008,1,,,,
    India,IND,2011,1,2,,,2
    India,IND,2012,22,31,10,10,35
    India,IND,2013,6,10,1,3,11
    India,IND,2014,66,87,45,15,77
    India,IND,2015,11,20,6,2,11
    Indonesia,IDN,2000,3,2,2,1,4
    Ireland,IRL,2000,1,1,,,
    Ireland,IRL,2012,1,1,,,1
    Ireland,IRL,2020,,1,,,
    Israel,ISR,2000,2,3,1,1,3
    Israel,ISR,2002,1,3,1,1,2
    Israel,ISR,2003,1,1,2,1,1
    Israel,ISR,2006,1,1,1,,1
    Israel,ISR,2007,1,1,2,,1
    Israel,ISR,2008,12,12,6,6,15
    Israel,ISR,2009,6,6,3,5,13
    Israel,ISR,2010,10,11,6,5,16
    Israel,ISR,2011,17,23,8,6,33
    Israel,ISR,2012,28,31,4,10,52
    Israel,ISR,2013,8,13,1,2,11
    Israel,ISR,2014,15,12,7,9,18
    Israel,ISR,2015,8,8,4,7,11
    Israel,ISR,2016,4,10,2,,8
    Israel,ISR,2017,4,10,1,2,10
    Israel,ISR,2018,10,21,3,5,25
    Israel,ISR,2019,7,13,5,6,12
    Israel,ISR,2020,8,14,5,4,11
    Israel,ISR,2021,5,12,3,1,11
    Israel,ISR,2001,,2,2,,1
    Italy,ITA,2000,4,5,4,1,5
    Italy,ITA,2001,6,6,3,2,5
    Italy,ITA,2002,4,6,1,,4
    Italy,ITA,2003,5,7,4,1,2
    Italy,ITA,2004,2,3,1,1,1
    Italy,ITA,2005,3,5,2,,1
    Italy,ITA,2006,5,7,2,1,5
    Italy,ITA,2007,6,10,5,,8
    Italy,ITA,2008,3,7,1,1,5
    Italy,ITA,2009,8,16,4,6,12
    Italy,ITA,2010,6,17,4,1,18
    Italy,ITA,2011,14,25,9,6,22
    Italy,ITA,2012,11,18,9,4,21
    Italy,ITA,2013,16,28,10,7,30
    Italy,ITA,2015,11,16,9,4,17
    Italy,ITA,2016,8,16,9,6,15
    Italy,ITA,2017,11,20,12,9,26
    Italy,ITA,2018,32,67,14,11,68
    Italy,ITA,2019,17,38,4,3,31
    Japan,JPN,2000,244,338,286,45,284
    Japan,JPN,2001,302,441,332,60,340
    Japan,JPN,2002,316,426,377,62,399
    Japan,JPN,2003,360,473,462,60,510
    Japan,JPN,2004,382,445,417,57,486
    Japan,JPN,2005,449,582,457,78,411
    Japan,JPN,2006,672,858,597,103,544
    Japan,JPN,2007,815,865,724,154,523
    Japan,JPN,2008,855,1032,695,188,605
    Japan,JPN,2009,937,1254,798,240,797
    Japan,JPN,2010,1135,1753,915,424,1160
    Japan,JPN,2011,1477,2404,1330,618,1570
    Japan,JPN,2012,1346,2267,1214,617,1468
    Japan,JPN,2013,1139,2103,1055,433,1225
    Japan,JPN,2014,1037,1889,971,381,1069
    Japan,JPN,2015,941,1662,839,288,1019
    Japan,JPN,2016,926,1695,849,292,1162
    Japan,JPN,2017,1128,1675,797,338,1356
    Japan,JPN,2018,1720,1944,982,419,1982
    Japan,JPN,2019,1184,1896,820,458,1776
    Japan,JPN,2020,402,665,288,145,588
    Japan,JPN,2021,52,91,24,21,79
    Jordan,JOR,2019,,1,,3,2
    Latvia,LVA,2012,1,1,1,,
    Latvia,LVA,2002,,,1,,
    Latvia,LVA,2007,,,2,,
    Lithuania,LTU,2009,1,4,1,1,2
    Lithuania,LTU,2010,3,2,3,,3
    Lithuania,LTU,2013,1,4,1,3,2
    Lithuania,LTU,2014,1,3,1,1,2
    Lithuania,LTU,2015,2,2,1,1,3
    Lithuania,LTU,2016,1,1,,,2
    Lithuania,LTU,2019,2,2,,,3
    Lithuania,LTU,2012,,1,,,
    Lithuania,LTU,2017,,1,1,,
    Lithuania,LTU,2018,,2,1,1,2
    Lower-middle-income countries,,2000,3,2,2,1,5
    Lower-middle-income countries,,2005,1,1,,,
    Lower-middle-income countries,,2007,3,4,8,,4
    Lower-middle-income countries,,2008,1,,1,1,
    Lower-middle-income countries,,2009,1,2,,,2
    Lower-middle-income countries,,2011,2,3,1,,7
    Lower-middle-income countries,,2012,27,36,11,11,44
    Lower-middle-income countries,,2013,6,13,2,3,18
    Lower-middle-income countries,,2014,68,91,48,17,82
    Lower-middle-income countries,,2015,24,29,15,3,28
    Lower-middle-income countries,,2016,5,11,3,4,17
    Lower-middle-income countries,,2017,6,7,5,1,14
    Lower-middle-income countries,,2018,25,38,10,16,57
    Lower-middle-income countries,,2019,20,45,6,31,74
    Lower-middle-income countries,,2020,4,19,5,7,18
    Lower-middle-income countries,,2021,4,7,2,1,11
    Lower-middle-income countries,,2001,,2,,,1
    Lower-middle-income countries,,2003,,1,2,,
    Lower-middle-income countries,,2004,,,1,,
    Lower-middle-income countries,,2006,,,2,1,
    Lower-middle-income countries,,2002,,,,,1
    Lower-middle-income countries,,2010,,,,,1
    Luxembourg,LUX,2005,1,1,1,,
    Luxembourg,LUX,2015,1,1,,,2
    Luxembourg,LUX,2016,2,2,,,3
    Luxembourg,LUX,2017,1,1,1,,3
    Luxembourg,LUX,2018,1,1,,,
    Luxembourg,LUX,2019,1,2,,,2
    Luxembourg,LUX,2020,3,5,2,2,4
    Luxembourg,LUX,2014,,1,,,
    Malaysia,MYS,2000,4,5,4,,2
    Malaysia,MYS,2002,1,1,1,,1
    Malaysia,MYS,2004,1,,,,
    Malaysia,MYS,2005,3,2,1,1,4
    Malaysia,MYS,2006,3,2,2,,2
    Malaysia,MYS,2008,5,9,4,4,10
    Malaysia,MYS,2009,2,8,1,1,4
    Malaysia,MYS,2010,9,9,6,,6
    Malaysia,MYS,2011,10,13,8,5,15
    Malaysia,MYS,2012,12,17,6,9,21
    Malaysia,MYS,2013,9,10,3,1,11
    Malaysia,MYS,2014,18,18,9,15,35
    Malaysia,MYS,2015,4,4,7,3,5
    Malaysia,MYS,2001,,3,2,,1
    Malaysia,MYS,2007,,2,,,
    Mexico,MEX,2000,3,6,4,1,
    Mexico,MEX,2001,6,9,3,2,5
    Mexico,MEX,2002,7,12,4,3,9
    Mexico,MEX,2003,14,10,9,5,13
    Mexico,MEX,2004,5,5,6,,6
    Mexico,MEX,2005,4,7,7,1,5
    Mexico,MEX,2006,10,10,3,2,10
    Mexico,MEX,2007,13,12,12,8,16
    Mexico,MEX,2008,4,5,5,3,2
    Mexico,MEX,2009,12,19,12,2,14
    Mexico,MEX,2010,36,38,15,10,45
    Mexico,MEX,2011,36,39,28,10,41
    Mexico,MEX,2012,27,46,10,14,46
    Mexico,MEX,2013,25,35,11,10,35
    Mexico,MEX,2014,39,46,26,24,62
    Mexico,MEX,2015,55,62,40,27,61
    Mexico,MEX,2016,34,63,26,16,57
    Mexico,MEX,2017,62,79,30,27,86
    Mexico,MEX,2018,9,21,6,9,21
    Mexico,MEX,2019,1,4,,1,2
    Moldova,MDA,2020,1,1,,,2
    Moldova,MDA,2007,,1,1,,
    Moldova,MDA,2005,,,1,,1
    Moldova,MDA,2015,,,1,,
    Morocco,MAR,2007,1,1,2,,1
    Morocco,MAR,2012,3,2,1,1,4
    Morocco,MAR,2015,5,3,3,,5
    Morocco,MAR,2016,1,3,,,3
    Morocco,MAR,2018,11,16,3,6,17
    Morocco,MAR,2019,2,3,,1,5
    Morocco,MAR,2003,,1,,,
    Morocco,MAR,2009,,1,,,
    Morocco,MAR,2013,,1,,,
    Morocco,MAR,2017,,1,,,2
    Morocco,MAR,2020,,1,,,
    Morocco,MAR,2011,,,1,,2
    Morocco,MAR,2000,,,,,1
    Morocco,MAR,2014,,,,,1
    Netherlands,NLD,2000,3,1,,1,1
    Netherlands,NLD,2001,1,2,,,2
    Netherlands,NLD,2002,2,4,3,,3
    Netherlands,NLD,2003,3,2,2,,3
    Netherlands,NLD,2004,2,2,2,1,1
    Netherlands,NLD,2005,1,2,2,,2
    Netherlands,NLD,2007,1,2,,,2
    Netherlands,NLD,2008,1,1,1,,
    Netherlands,NLD,2009,3,3,1,1,6
    Netherlands,NLD,2010,7,8,4,6,14
    Netherlands,NLD,2011,8,8,5,4,12
    Netherlands,NLD,2012,3,2,1,1,3
    Netherlands,NLD,2013,3,3,2,1,2
    Netherlands,NLD,2015,2,3,1,,6
    Netherlands,NLD,2016,2,2,1,,3
    Netherlands,NLD,2017,9,10,1,1,13
    Netherlands,NLD,2018,7,10,2,1,12
    Netherlands,NLD,2019,7,13,2,3,20
    Netherlands,NLD,2020,2,5,,,9
    Netherlands,NLD,2021,1,1,,,1
    Netherlands,NLD,2014,,1,,1,2
    New Zealand,NZL,2002,4,2,2,2,4
    New Zealand,NZL,2003,3,1,2,,2
    New Zealand,NZL,2004,2,2,1,1,4
    New Zealand,NZL,2006,7,4,6,2,4
    New Zealand,NZL,2007,2,2,1,1,3
    New Zealand,NZL,2008,1,2,1,,
    New Zealand,NZL,2009,3,4,4,,6
    New Zealand,NZL,2010,8,7,4,1,9
    New Zealand,NZL,2011,7,7,3,4,12
    New Zealand,NZL,2012,6,7,3,4,11
    New Zealand,NZL,2013,3,2,2,1,4
    New Zealand,NZL,2015,1,6,,,2
    New Zealand,NZL,2016,2,3,2,,3
    New Zealand,NZL,2017,3,4,3,2,2
    New Zealand,NZL,2001,,2,3,,1
    New Zealand,NZL,2005,,,1,,2
    New Zealand,NZL,2014,,,1,,
    New Zealand,NZL,2018,,,2,,
    Nicaragua,NIC,2012,1,1,,,2
    Nicaragua,NIC,2007,,,1,,1
    North America,,2000,301,364,213,62,272
    North America,,2001,287,365,193,60,216
    North America,,2002,352,457,263,82,300
    North America,,2003,338,469,265,80,344
    North America,,2004,301,459,217,52,330
    North America,,2005,412,647,327,83,391
    North America,,2006,547,830,405,105,538
    North America,,2007,736,1036,546,172,790
    North America,,2008,924,1135,535,255,843
    North America,,2009,966,1327,523,279,1140
    North America,,2010,1216,1876,728,428,1574
    North America,,2011,1748,2639,1097,677,2316
    North America,,2012,1897,2769,1176,787,2513
    North America,,2013,1708,2717,1066,693,2218
    North America,,2014,1823,2891,1059,730,2400
    North America,,2015,1712,2848,995,671,2204
    North America,,2016,1780,2970,957,707,2567
    North America,,2017,1966,3243,1089,725,2763
    North America,,2018,1900,3167,963,764,2805
    North America,,2019,2038,3517,1022,906,3294
    North America,,2020,1086,2159,653,583,1928
    North America,,2021,343,717,170,193,663
    Norway,NOR,2000,3,1,3,,2
    Norway,NOR,2001,2,1,3,,
    Norway,NOR,2002,1,2,1,,
    Norway,NOR,2004,6,2,4,,3
    Norway,NOR,2005,3,1,1,,2
    Norway,NOR,2006,5,2,2,1,3
    Norway,NOR,2007,1,2,1,,2
    Norway,NOR,2008,2,2,2,2,2
    Norway,NOR,2009,1,1,,,1
    Norway,NOR,2010,1,3,1,1,3
    Norway,NOR,2011,6,6,2,2,9
    Norway,NOR,2012,1,3,,1,2
    Norway,NOR,2013,3,3,1,1,4
    Norway,NOR,2014,9,13,5,8,15
    Norway,NOR,2015,7,7,1,3,11
    Norway,NOR,2016,4,6,,1,8
    Norway,NOR,2017,1,2,,1,6
    Norway,NOR,2018,6,8,1,,11
    Norway,NOR,2019,9,15,1,1,26
    Norway,NOR,2020,5,7,,,10
    Norway,NOR,2003,,4,,,
    Oceania,,2000,31,33,27,11,33
    Oceania,,2001,37,63,30,14,48
    Oceania,,2002,34,48,20,13,33
    Oceania,,2003,79,101,48,13,82
    Oceania,,2004,14,20,13,5,24
    Oceania,,2005,22,29,28,8,30
    Oceania,,2006,34,31,27,10,32
    Oceania,,2007,35,33,19,7,36
    Oceania,,2008,27,44,23,9,38
    Oceania,,2009,44,61,40,20,66
    Oceania,,2010,78,84,37,18,98
    Oceania,,2011,79,92,59,24,93
    Oceania,,2012,107,108,54,53,156
    Oceania,,2013,53,67,30,19,64
    Oceania,,2014,47,51,34,20,53
    Oceania,,2015,40,59,20,16,45
    Oceania,,2016,37,56,25,16,58
    Oceania,,2017,59,76,40,24,86
    Oceania,,2018,70,111,31,36,141
    Oceania,,2019,63,112,23,22,131
    Oceania,,2020,40,75,20,15,90
    Oceania,,2021,30,41,18,12,54
    Peru,PER,2000,2,1,2,,2
    Peru,PER,2009,2,2,,,4
    Peru,PER,2010,2,4,1,,6
    Peru,PER,2016,2,2,3,3,6
    Peru,PER,2017,1,1,,,
    Peru,PER,2018,1,4,1,4,3
    Peru,PER,2019,3,5,1,1,7
    Peru,PER,2020,2,2,,,2
    Peru,PER,2001,,1,,,
    Peru,PER,2004,,1,,,
    Peru,PER,2012,,1,,,
    Philippines,PHL,2014,2,3,2,2,4
    Philippines,PHL,2015,7,5,6,1,8
    Philippines,PHL,2016,4,8,3,4,11
    Philippines,PHL,2017,5,5,5,,9
    Philippines,PHL,2018,14,22,7,10,38
    Philippines,PHL,2019,18,41,6,30,68
    Philippines,PHL,2020,4,18,5,7,18
    Philippines,PHL,2021,4,7,2,1,11
    Philippines,PHL,2013,,,,,2
    Poland,POL,2000,6,2,6,,1
    Poland,POL,2001,3,2,2,2,1
    Poland,POL,2002,4,5,2,,5
    Poland,POL,2003,9,10,5,2,11
    Poland,POL,2004,5,8,,2,8
    Poland,POL,2005,2,3,1,,3
    Poland,POL,2006,7,6,4,1,6
    Poland,POL,2007,2,8,,,2
    Poland,POL,2008,5,12,6,2,7
    Poland,POL,2009,4,12,3,2,10
    Poland,POL,2010,20,30,17,9,34
    Poland,POL,2011,17,42,12,12,32
    Poland,POL,2012,19,33,12,9,27
    Poland,POL,2013,8,34,7,6,17
    Poland,POL,2014,16,45,12,12,28
    Poland,POL,2015,18,58,12,5,25
    Poland,POL,2016,13,42,3,3,15
    Poland,POL,2017,13,47,8,10,25
    Poland,POL,2018,11,38,11,4,19
    Poland,POL,2019,3,12,1,2,11
    Poland,POL,2020,3,5,,,5
    Portugal,PRT,2001,3,3,1,1,1
    Portugal,PRT,2003,3,5,1,1,5
    Portugal,PRT,2004,2,2,,2,4
    Portugal,PRT,2005,2,1,,,1
    Portugal,PRT,2006,3,4,1,,4
    Portugal,PRT,2007,2,4,2,,2
    Portugal,PRT,2008,2,4,1,,4
    Portugal,PRT,2009,2,6,1,4,6
    Portugal,PRT,2010,8,12,7,4,16
    Portugal,PRT,2011,4,9,4,4,9
    Portugal,PRT,2012,7,8,4,6,9
    Portugal,PRT,2013,5,11,2,6,7
    Portugal,PRT,2014,7,8,5,1,12
    Portugal,PRT,2015,3,3,2,2,4
    Portugal,PRT,2016,1,6,,,5
    Portugal,PRT,2017,9,12,4,2,14
    Portugal,PRT,2018,6,9,3,5,14
    Portugal,PRT,2019,2,4,1,1,8
    Portugal,PRT,2000,,1,3,,1
    Portugal,PRT,2020,,1,1,,
    Romania,ROU,2002,1,,3,,
    Romania,ROU,2003,2,,4,,
    Romania,ROU,2004,3,,3,,
    Romania,ROU,2007,1,3,1,,
    Romania,ROU,2008,3,1,4,4,
    Romania,ROU,2010,1,,,,1
    Romania,ROU,2011,1,,3,,3
    Romania,ROU,2013,1,2,1,,2
    Romania,ROU,2015,4,3,2,,1
    Romania,ROU,2016,1,,2,,
    Romania,ROU,2018,1,1,,,2
    Romania,ROU,2019,3,3,1,,3
    Romania,ROU,2021,1,1,,,2
    Romania,ROU,2001,,1,3,,
    Romania,ROU,2009,,2,2,1,2
    Romania,ROU,2000,,,1,,
    Romania,ROU,2005,,,1,,
    Romania,ROU,2014,,,,1,1
    Romania,ROU,2017,,,,,1
    Romania,ROU,2020,,,,,1
    Russia,RUS,2000,11,5,15,2,3
    Russia,RUS,2001,6,8,7,3,3
    Russia,RUS,2002,10,5,5,2,7
    Russia,RUS,2003,16,9,14,3,7
    Russia,RUS,2004,6,9,12,2,7
    Russia,RUS,2005,14,16,18,3,10
    Russia,RUS,2006,30,26,26,7,22
    Russia,RUS,2007,37,38,47,7,32
    Russia,RUS,2008,49,50,35,14,51
    Russia,RUS,2009,32,46,37,9,38
    Russia,RUS,2010,63,88,64,19,89
    Russia,RUS,2011,75,96,78,30,96
    Russia,RUS,2012,60,84,45,20,84
    Russia,RUS,2013,69,77,46,18,71
    Russia,RUS,2014,70,94,75,37,97
    Russia,RUS,2015,92,102,71,40,99
    Russia,RUS,2016,68,94,71,30,75
    Russia,RUS,2017,73,94,64,26,85
    Russia,RUS,2018,66,88,50,32,94
    Russia,RUS,2019,40,52,46,11,48
    Russia,RUS,2020,14,21,19,2,21
    Russia,RUS,2021,1,8,5,,1
    San Marino,SMR,2015,1,,,,
    San Marino,SMR,2016,1,1,1,,1
    Saudi Arabia,SAU,2015,3,3,2,1,2
    Saudi Arabia,SAU,2016,2,1,,,1
    Saudi Arabia,SAU,2018,1,1,,,2
    Saudi Arabia,SAU,2012,,1,,,1
    Saudi Arabia,SAU,2017,,1,,1,2
    Serbia,SRB,2010,1,1,1,,1
    Serbia,SRB,2013,1,4,,3,2
    Serbia,SRB,2015,2,3,1,1,2
    Serbia,SRB,2012,,2,,,2
    Serbia,SRB,2017,,2,,,
    Serbia,SRB,2018,,2,1,2,2
    Serbia,SRB,2019,,2,,,1
    Serbia,SRB,2008,,,1,,1
    Serbia,SRB,2011,,,,,1
    Serbia,SRB,2014,,,,,1
    Singapore,SGP,2000,4,3,1,3,6
    Singapore,SGP,2004,2,2,1,,2
    Singapore,SGP,2006,1,2,,,2
    Singapore,SGP,2007,1,2,1,,2
    Singapore,SGP,2009,5,7,3,3,8
    Singapore,SGP,2010,15,20,7,1,18
    Singapore,SGP,2011,13,16,9,4,20
    Singapore,SGP,2012,19,30,13,15,50
    Singapore,SGP,2013,22,27,12,8,30
    Singapore,SGP,2014,23,30,14,12,38
    Singapore,SGP,2015,31,45,4,11,46
    Singapore,SGP,2016,15,31,11,9,38
    Singapore,SGP,2017,18,30,8,7,34
    Singapore,SGP,2018,7,22,7,6,23
    Singapore,SGP,2019,36,30,11,12,45
    Singapore,SGP,2020,10,15,,3,22
    Singapore,SGP,2021,1,1,,,1
    Singapore,SGP,2001,,1,,,
    Slovakia,SVK,2000,1,,1,,
    Slovakia,SVK,2001,1,1,1,,
    Slovakia,SVK,2018,3,6,,,3
    Slovakia,SVK,2019,3,3,1,,4
    Slovakia,SVK,2020,4,4,,,6
    Slovakia,SVK,2007,,1,,,1
    Slovakia,SVK,2017,,1,,,
    Slovakia,SVK,2013,,,2,,
    Slovakia,SVK,2015,,,1,,
    Slovakia,SVK,2008,,,,,1
    Slovakia,SVK,2016,,,,,1
    Slovenia,SVN,2000,1,,,,
    Slovenia,SVN,2003,1,2,1,,1
    Slovenia,SVN,2004,1,1,,1,2
    Slovenia,SVN,2005,2,1,1,,1
    Slovenia,SVN,2006,2,3,,,4
    Slovenia,SVN,2007,1,1,,,1
    Slovenia,SVN,2009,1,3,,2,4
    Slovenia,SVN,2010,6,6,5,2,9
    Slovenia,SVN,2011,1,2,1,1,2
    Slovenia,SVN,2012,5,8,2,4,8
    Slovenia,SVN,2013,4,4,2,3,4
    Slovenia,SVN,2014,3,4,,2,5
    Slovenia,SVN,2015,3,4,1,1,4
    Slovenia,SVN,2019,1,1,,1,2
    Slovenia,SVN,2017,,2,1,,
    Slovenia,SVN,2018,,2,1,2,2
    Slovenia,SVN,2008,,,,,1
    South Africa,ZAF,2001,3,,3,1,1
    South Africa,ZAF,2003,1,1,1,,
    South Africa,ZAF,2004,3,4,2,1,4
    South Africa,ZAF,2005,2,,,2,1
    South Africa,ZAF,2006,2,5,4,5,5
    South Africa,ZAF,2007,6,7,5,3,4
    South Africa,ZAF,2008,4,2,2,1,1
    South Africa,ZAF,2009,1,4,3,,4
    South Africa,ZAF,2010,4,8,3,1,5
    South Africa,ZAF,2011,17,17,12,5,27
    South Africa,ZAF,2012,16,21,8,4,20
    South Africa,ZAF,2013,12,12,8,5,7
    South Africa,ZAF,2014,14,14,4,5,19
    South Africa,ZAF,2015,8,8,4,4,7
    South Africa,ZAF,2016,4,2,,2,3
    South Africa,ZAF,2017,5,5,2,3,4
    South Africa,ZAF,2018,4,7,4,2,11
    South Africa,ZAF,2019,5,8,3,4,8
    South Africa,ZAF,2021,2,3,1,,2
    South Africa,ZAF,2002,,1,2,,1
    South Africa,ZAF,2020,,3,2,,3
    South Africa,ZAF,2000,,,2,1,
    South America,,2000,7,7,6,1,5
    South America,,2001,5,12,4,10,7
    South America,,2002,7,11,3,2,6
    South America,,2003,18,18,11,6,17
    South America,,2004,8,11,8,2,11
    South America,,2005,15,18,14,2,13
    South America,,2006,28,30,18,7,28
    South America,,2007,34,44,34,10,45
    South America,,2008,47,52,25,12,47
    South America,,2009,58,72,27,10,74
    South America,,2010,120,157,62,41,179
    South America,,2011,92,125,57,34,124
    South America,,2012,94,127,56,39,144
    South America,,2013,90,107,52,27,106
    South America,,2014,63,74,31,31,93
    South America,,2015,51,71,49,17,64
    South America,,2016,61,95,38,24,94
    South America,,2017,56,101,51,22,90
    South America,,2018,58,91,35,35,108
    South America,,2019,58,82,28,27,94
    South America,,2020,13,27,10,4,28
    South America,,2021,6,8,1,,8
    South Korea,KOR,2000,35,72,37,1,48
    South Korea,KOR,2001,35,78,46,15,42
    South Korea,KOR,2002,37,127,49,14,50
    South Korea,KOR,2003,71,116,67,18,88
    South Korea,KOR,2004,49,134,66,12,68
    South Korea,KOR,2005,62,162,73,16,62
    South Korea,KOR,2006,124,351,126,23,128
    South Korea,KOR,2007,162,334,130,34,164
    South Korea,KOR,2008,200,407,158,65,217
    South Korea,KOR,2009,226,595,172,72,354
    South Korea,KOR,2010,314,895,236,118,492
    South Korea,KOR,2011,405,1160,319,173,607
    South Korea,KOR,2012,446,1179,319,193,673
    South Korea,KOR,2013,441,1029,271,142,537
    South Korea,KOR,2014,474,1172,308,191,585
    South Korea,KOR,2015,381,1032,347,151,459
    South Korea,KOR,2016,563,1241,370,198,990
    South Korea,KOR,2017,601,1286,334,204,1019
    South Korea,KOR,2018,682,1277,405,296,1239
    South Korea,KOR,2019,728,1417,395,380,1516
    South Korea,KOR,2020,292,592,131,149,679
    South Korea,KOR,2021,70,152,25,32,193
    Spain,ESP,2000,10,10,13,,10
    Spain,ESP,2001,15,26,13,4,13
    Spain,ESP,2002,16,20,7,2,11
    Spain,ESP,2003,31,37,20,5,32
    Spain,ESP,2004,17,23,9,5,26
    Spain,ESP,2005,17,16,6,,16
    Spain,ESP,2006,35,27,21,7,26
    Spain,ESP,2007,34,26,25,5,31
    Spain,ESP,2008,39,48,24,14,49
    Spain,ESP,2009,32,49,21,8,48
    Spain,ESP,2010,59,76,26,25,108
    Spain,ESP,2011,52,88,25,22,89
    Spain,ESP,2012,89,102,41,36,115
    Spain,ESP,2013,67,89,28,28,95
    Spain,ESP,2014,66,94,37,29,118
    Spain,ESP,2015,30,50,17,8,47
    Spain,ESP,2016,28,47,15,10,55
    Spain,ESP,2017,25,48,21,12,40
    Spain,ESP,2018,39,51,16,15,69
    Spain,ESP,2019,14,25,3,3,31
    Spain,ESP,2020,7,15,4,5,22
    Spain,ESP,2021,5,9,2,1,10
    Sweden,SWE,2000,3,5,2,2,3
    Sweden,SWE,2001,1,1,1,,
    Sweden,SWE,2002,5,5,3,1,4
    Sweden,SWE,2003,2,2,1,,2
    Sweden,SWE,2005,2,2,2,,3
    Sweden,SWE,2007,2,3,1,2,2
    Sweden,SWE,2008,2,5,1,1,6
    Sweden,SWE,2009,16,15,2,3,12
    Sweden,SWE,2010,18,13,8,3,21
    Sweden,SWE,2011,6,13,4,1,6
    Sweden,SWE,2012,9,12,7,2,11
    Sweden,SWE,2013,7,9,4,1,9
    Sweden,SWE,2014,3,8,3,2,7
    Sweden,SWE,2015,11,20,4,7,26
    Sweden,SWE,2016,11,18,5,2,16
    Sweden,SWE,2017,5,19,5,4,15
    Sweden,SWE,2018,9,28,5,3,23
    Sweden,SWE,2019,6,19,2,2,8
    Sweden,SWE,2020,5,13,,1,10
    Sweden,SWE,2004,,1,,,
    Sweden,SWE,2006,,4,1,,2
    Switzerland,CHE,2001,1,1,1,1,1
    Switzerland,CHE,2006,1,2,3,,1
    Switzerland,CHE,2008,2,1,2,,2
    Switzerland,CHE,2009,1,5,,2,6
    Switzerland,CHE,2010,1,1,,1,4
    Switzerland,CHE,2011,4,3,2,1,8
    Switzerland,CHE,2013,3,3,2,1,4
    Switzerland,CHE,2014,2,2,1,1,2
    Switzerland,CHE,2015,2,4,1,1,5
    Switzerland,CHE,2016,3,4,,1,4
    Switzerland,CHE,2017,4,5,2,1,6
    Switzerland,CHE,2018,7,14,,1,18
    Switzerland,CHE,2019,4,5,1,3,6
    Switzerland,CHE,2020,4,7,,2,11
    Switzerland,CHE,2005,,1,,,
    Switzerland,CHE,2007,,1,1,,2
    Switzerland,CHE,2012,,,,,1
    Taiwan,TWN,2000,13,31,14,5,13
    Taiwan,TWN,2001,13,23,11,3,10
    Taiwan,TWN,2002,17,26,18,1,15
    Taiwan,TWN,2003,21,28,22,6,17
    Taiwan,TWN,2004,20,43,16,6,15
    Taiwan,TWN,2005,9,38,7,3,18
    Taiwan,TWN,2006,15,49,14,4,20
    Taiwan,TWN,2007,17,44,13,8,25
    Taiwan,TWN,2008,22,45,15,10,35
    Taiwan,TWN,2009,26,69,17,2,37
    Taiwan,TWN,2010,58,94,38,22,91
    Taiwan,TWN,2011,99,190,45,37,123
    Taiwan,TWN,2012,115,206,66,48,143
    Taiwan,TWN,2013,51,138,41,19,72
    Taiwan,TWN,2014,53,153,47,28,80
    Taiwan,TWN,2015,58,107,34,20,82
    Taiwan,TWN,2016,39,109,32,20,74
    Taiwan,TWN,2017,58,128,44,19,77
    Taiwan,TWN,2018,97,258,49,62,303
    Taiwan,TWN,2019,67,116,25,30,122
    Taiwan,TWN,2020,36,84,18,19,90
    Taiwan,TWN,2021,7,14,1,1,15
    Tunisia,TUN,2014,,1,,,
    Tunisia,TUN,2007,,,1,,1
    Tunisia,TUN,2011,,,,,1
    Tunisia,TUN,2016,,,,,1
    Tunisia,TUN,2018,,,,,1
    Tunisia,TUN,2019,,,,,1
    Turkey,TUR,2008,1,1,1,,
    Turkey,TUR,2009,1,3,,,
    Turkey,TUR,2010,1,1,1,,4
    Turkey,TUR,2011,3,5,2,1,5
    Turkey,TUR,2014,1,1,3,1,4
    Turkey,TUR,2015,2,4,4,1,4
    Turkey,TUR,2017,3,6,2,,5
    Turkey,TUR,2018,1,1,,,1
    Turkey,TUR,2019,4,5,,,9
    Turkey,TUR,2020,1,1,1,,2
    Turkey,TUR,2001,,1,,,
    Turkey,TUR,2003,,1,,,
    Turkey,TUR,2004,,1,,,1
    Turkey,TUR,2007,,1,,,4
    Turkey,TUR,2013,,4,1,1,
    Turkey,TUR,2016,,4,2,1,1
    Turkey,TUR,2021,,1,,1,5
    Turkey,TUR,2012,,,,1,
    Turkey,TUR,2002,,,,,1
    Ukraine,UKR,2005,1,1,,,
    Ukraine,UKR,2009,1,1,,,2
    Ukraine,UKR,2015,1,1,,,4
    Ukraine,UKR,2017,1,1,,1,2
    Ukraine,UKR,2001,,2,,,
    Ukraine,UKR,2012,,1,,,1
    Ukraine,UKR,2013,,2,1,,5
    Ukraine,UKR,2019,,1,,,
    Ukraine,UKR,2003,,,2,,
    Ukraine,UKR,2004,,,1,,
    Ukraine,UKR,2006,,,2,1,
    Ukraine,UKR,2007,,,3,,
    Ukraine,UKR,2008,,,1,,
    Ukraine,UKR,2014,,,1,,
    Ukraine,UKR,2002,,,,,1
    Ukraine,UKR,2010,,,,,1
    Ukraine,UKR,2016,,,,,2
    Ukraine,UKR,2018,,,,,1
    United Kingdom,GBR,2000,9,11,5,4,12
    United Kingdom,GBR,2001,15,16,12,3,12
    United Kingdom,GBR,2002,15,22,8,4,13
    United Kingdom,GBR,2003,13,20,5,4,17
    United Kingdom,GBR,2004,15,25,9,3,30
    United Kingdom,GBR,2005,17,24,16,6,18
    United Kingdom,GBR,2006,16,18,18,2,13
    United Kingdom,GBR,2007,21,24,17,5,21
    United Kingdom,GBR,2008,36,41,28,9,31
    United Kingdom,GBR,2009,40,45,27,11,55
    United Kingdom,GBR,2010,50,50,38,13,45
    United Kingdom,GBR,2011,40,48,20,10,42
    United Kingdom,GBR,2012,80,98,36,19,111
    United Kingdom,GBR,2013,71,84,46,26,94
    United Kingdom,GBR,2014,67,82,36,19,79
    United Kingdom,GBR,2015,73,118,32,25,90
    United Kingdom,GBR,2016,70,98,34,24,87
    United Kingdom,GBR,2017,72,99,35,41,100
    United Kingdom,GBR,2018,74,118,24,37,138
    United Kingdom,GBR,2019,38,91,18,21,91
    United Kingdom,GBR,2020,38,94,39,19,73
    United Kingdom,GBR,2021,1,9,4,3,4
    United States,USA,2000,264,318,177,51,244
    United States,USA,2001,243,308,160,46,185
    United States,USA,2002,296,389,230,71,252
    United States,USA,2003,292,419,227,64,296
    United States,USA,2004,275,420,192,48,289
    United States,USA,2005,365,580,277,77,349
    United States,USA,2006,486,755,364,90,478
    United States,USA,2007,665,949,488,146,714
    United States,USA,2008,862,1042,487,228,775
    United States,USA,2009,899,1232,468,252,1041
    United States,USA,2010,1091,1715,671,388,1404
    United States,USA,2011,1626,2486,1030,634,2164
    United States,USA,2012,1754,2562,1104,704,2277
    United States,USA,2013,1591,2555,1010,650,2060
    United States,USA,2014,1664,2711,970,657,2176
    United States,USA,2015,1544,2633,900,603,1996
    United States,USA,2016,1653,2766,888,663,2366
    United States,USA,2017,1790,3005,1009,658,2516
    United States,USA,2018,1797,3007,922,715,2618
    United States,USA,2019,1934,3341,987,853,3102
    United States,USA,2020,1048,2075,635,566,1849
    United States,USA,2021,339,703,167,191,652
    Upper-middle-income countries,,2000,63,81,79,17,65
    Upper-middle-income countries,,2001,67,103,59,34,64
    Upper-middle-income countries,,2002,74,117,62,16,76
    Upper-middle-income countries,,2003,155,184,133,44,154
    Upper-middle-income countries,,2004,109,207,128,35,177
    Upper-middle-income countries,,2005,220,264,197,32,215
    Upper-middle-income countries,,2006,419,582,341,90,404
    Upper-middle-income countries,,2007,576,739,430,114,545
    Upper-middle-income countries,,2008,785,941,492,194,726
    Upper-middle-income countries,,2009,755,1065,495,150,843
    Upper-middle-income countries,,2010,1184,1637,741,310,1462
    Upper-middle-income countries,,2011,1635,2443,1170,552,2020
    Upper-middle-income countries,,2012,1739,2561,1209,596,2071
    Upper-middle-income countries,,2013,1632,2543,1128,510,1934
    Upper-middle-income countries,,2014,1667,2597,1292,618,2128
    Upper-middle-income countries,,2015,1698,3459,1414,704,2282
    Upper-middle-income countries,,2016,2401,5785,1850,1147,4554
    Upper-middle-income countries,,2017,3772,9533,2449,1689,8584
    Upper-middle-income countries,,2018,5033,10692,2403,1993,12675
    Upper-middle-income countries,,2019,6714,14052,2586,2259,16785
    Upper-middle-income countries,,2020,6534,15458,2328,2072,18788
    Upper-middle-income countries,,2021,2155,5310,831,796,6521
    Uruguay,URY,2019,1,1,1,1,1
    Uruguay,URY,2014,,,,,1
    World,OWID_WRL,2000,916,1198,855,180,934
    World,OWID_WRL,2001,975,1385,853,242,904
    World,OWID_WRL,2002,1127,1554,979,228,1119
    World,OWID_WRL,2003,1320,1742,1199,276,1473
    World,OWID_WRL,2004,1104,1617,1009,208,1342
    World,OWID_WRL,2005,1470,2068,1296,259,1387
    World,OWID_WRL,2006,2176,3153,1806,384,2032
    World,OWID_WRL,2007,2788,3581,2179,538,2452
    World,OWID_WRL,2008,3358,4251,2246,860,2956
    World,OWID_WRL,2009,3576,5231,2365,940,4058
    World,OWID_WRL,2010,4916,7568,3204,1589,6109
    World,OWID_WRL,2011,6416,10431,4597,2388,8107
    World,OWID_WRL,2012,6849,10764,4764,2696,8540
    World,OWID_WRL,2013,6103,10211,4271,2188,7386
    World,OWID_WRL,2014,6149,10313,4357,2292,7598
    World,OWID_WRL,2015,5772,10715,4146,2123,7392
    World,OWID_WRL,2016,6690,13336,4574,2656,10733
    World,OWID_WRL,2017,8813,17886,5335,3355,15706
    World,OWID_WRL,2018,10943,19893,5490,4007,21475
    World,OWID_WRL,2019,12217,23742,5478,4504,26013
    World,OWID_WRL,2020,9039,20387,3778,3217,23282
    World,OWID_WRL,2021,2776,6595,1131,1107,7752`;
const newData = turnCSVToObject(CSVData);

const initialState: StateInterface = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',
  DATA: newData,
  allOptions: Object.keys(newData),
  selectedOption: 'World', 
  selectedYear: 2018,
}

export const Context = createContext<ContextInterface>({
  state: initialState,
  setState: () => {} 
}) as React.Context<ContextInterface>;

export const Provider = (props: any) => {
  const [state, setState] = useState<StateInterface>(initialState);
  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};
