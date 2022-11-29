const form = document.querySelector('form');
const outputArea = document.querySelector('.output');
const loading = document.querySelector('.loading');
const activityInput = document.querySelector('.enter-activity');
const results = document.querySelector('.results');
const unitSelector = document.querySelector('.unit-selector');
const unitRadios = document.querySelectorAll('.radio-units');
const addGoalBtn = document.querySelector('.goal-add'); 
const goalCard = document.querySelector('.card--goals');

let measurement = 'km';
let metricOrStandard;
let clientId = '96784';
let clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';
let callActivity = 'https://www.strava.com/api/v3/activities/id?access_token=';

let activities;

let globalRace;

// const race = {
//     "resource_state": 3,
//     "athlete": {
//         "id": 14708264,
//         "resource_state": 1
//     },
//     "name": "Richmond Half",
//     "distance": 21369.8,
//     "moving_time": 6115,
//     "elapsed_time": 6115,
//     "total_elevation_gain": 520,
//     "type": "Run",
//     "sport_type": "Run",
//     "workout_type": 1,
//     "id": 8076222179,
//     "start_date": "2022-11-06T09:05:52Z",
//     "start_date_local": "2022-11-06T09:05:52Z",
//     "timezone": "(GMT+00:00) Europe/London",
//     "utc_offset": 0,
//     "location_city": null,
//     "location_state": null,
//     "location_country": "",
//     "achievement_count": 45,
//     "kudos_count": 7,
//     "comment_count": 4,
//     "athlete_count": 16,
//     "photo_count": 0,
//     "map": {
//         "id": "a8076222179",
//         "polyline": "yrbyH|_{@z@tD^dAp@`CBLABQ[Qk@[k@e@yAC?g@Ns@Fc@Jc@d@UHe@BcA`@YHoAt@URNlBJ\\\\dBPt@@`@CVRbAJjBPxAFTHFZF`@ItBcAt@UVSnCyATQVKJH?LIR]d@u@p@]h@e@b@[h@OLUf@g@jBF`CLlABBFAAa@UaC@GFKXIb@OpCcB`@G^UD?PFXf@TfAhAfIBf@NhAJZRVFAHKRg@D]BEPM\\_@VSFSJs@\\u@P[HGV]Nm@XwCBELCFQVYLKL_@NWFe@Py@RaBH[Na@^yBt@eCJy@d@gBVo@d@}AHc@Km@Bg@JKH?\\EZSPa@JKLOJm@\\m@r@{@pBsBMSBIRO`@w@DAPc@^i@h@_@t@a@PUTm@|@}@LC`@_@nAs@^OPMj@Sb@[b@Mr@k@b@Q`@U\\KN[V[\\K^CLGVA\\If@a@RKTSb@k@HGl@AJFTj@\\|AJH^l@|@p@hBzAl@p@jB|Ad@f@P\\r@`Az@|@j@`AZh@Ll@?LH\\@Zt@fBHj@V~@v@|BJj@Rf@Ld@Vn@Jn@LvAH`@Hz@Nn@BRFNr@hE@~@Lx@D`@DNLvATjADdBTjBPr@d@hFT~@T|A?d@D|@ZvEF`B@j@Ap@DjBMl@FvA?dAFd@JtARhANtAZd@BXJf@XVFd@FPJl@XbAF|@f@pC@TARDXJ`@JRBPVx@?PKpADh@Jf@Z~@h@bAFZJFBPJ\\\\v@BXPn@@Nn@bA`A|@HNJDF@DLXVV\\D@H?JHLJV\\r@VZTb@Fr@TJG^@BCJEH?PFJ@VURHJAPKRAFGLE\\@F@VETWPKVGLGv@SX?VKPWDAVDNEPML_@LEr@o@H?b@Mt@o@ZOFMHI^Q`@G\\SD@REPQDCFBBCX?d@GPc@ZUhAm@^FXWHELBNFPCT?d@LLANIb@A`@IJKf@WNALOb@[PAb@WV[Tc@NSXuA`@c@d@{Af@w@~@gCjAuDPkAVi@t@iCFc@Fu@Ek@BQVc@HS@WRkACQ\\oADa@JMFY@GAWFa@By@LY?QFs@Jo@HUNy@@UPuAVsALs@d@cANiANy@rAmCFYBg@N[\\mAj@cBHq@P_@Nq@HgA@c@^]FK^ULUr@cATm@b@_AJ]AKU?c@So@GOOa@SQAm@DI?k@m@ICG@q@Ug@e@[_@YOg@k@QMYo@a@i@[s@c@m@O]UEIJc@nAWX]hAuB`DCR?h@CRId@O^Qt@GNOfC?^IH?FKnAKt@E`AUtBERCh@WnBMpBQ~@?d@Iv@?fAHf@DxABjBAx@]tAW|@_@j@s@h@c@J_@Xg@TiAp@g@b@a@J}@p@KJc@|@a@l@aAbAW\\a@^e@dAONS^iCzBG?k@Vg@\\]NiBDeAAk@KCESGk@Ec@Mm@]a@a@Y_@YWWa@[y@s@cAeAsCU{AM_@Y_Co@eE_@wBYqAYe@{AuBi@m@m@Mi@LQH[VQZYXy@rAIHc@R_@Zm@r@WP_@NW^CFw@n@KRKB]TWZO^[bCKZG`A@vBJ~@@j@Rp@Hf@JvAATF\\Vx@NPPZ\\pBXn@?l@DVDPPdALb@f@fCJj@Dj@JX@XRl@Bf@Pl@R`@J`@\\tCl@jANTB@Tb@b@d@L`@h@|@`AfAb@\\ZPb@^t@Tp@Pt@TH?RFb@@TC\\@l@INE\\ULCDGPGPA^K^SnA[xAu@XQd@{@NOh@YV?|Ac@XKTCj@_@JCDGNILY`@QREnAk@f@OZCZDvAEx@[ZBtA]xAm@\\Uh@e@RINQJc@LSr@gBh@c@NA\\eARiALe@Vo@Pq@RUTi@HWLm@d@aBHUV_@^uALk@Bc@Jm@Dm@C[Tw@PEJO@URy@Fk@?i@VcARi@Ae@HSJiAEa@?MDa@DoAHo@^}@\\gBLe@f@iAf@{CjAuCNy@h@}ARaA`@kAZaB@o@Jg@Pk@X[LWH[d@u@f@i@b@y@Pg@AK[MgASm@[_ALQGi@]y@a@iAaAe@YYi@e@a@_@y@a@s@GSw@gAGCwBrEmBdDY`Ac@xB{@jJK|AE`ABVEp@Qv@QbBSxCCz@@bAIdADdDCj@a@tBWj@]j@_@`@{At@kAt@o@ZqAfA_@b@}@rAe@f@u@lA_A`AWb@]b@_Az@uA~@aAb@gAVcCPc@Ea@M_Ak@gA[YWKQm@e@iAgBa@e@Wk@w@aC]oAMkA?{@]aBGQEG[oAYqBOk@q@cB]_@sAcCc@UYBs@^UPa@j@Yh@_@^i@\\eB~AqAbAy@v@m@b@G?[cAEUKIS?KEIQ[sFc@mBCk@SsAS_EK}@K_BMs@Uo@Em@Mk@S}BIo@CyAEs@YqAMoB]yB[eA]yA_AwCGYEe@[o@q@sBo@yCISo@_A][m@y@Yi@yAcBiBmBu@o@MSgBwA_@_@k@}@]eAQs@S@UGKN[N]Vi@TSD[Ng@Jc@TSAMDi@r@c@To@JmB|@_Ap@k@Pc@\\qBhAeAt@m@p@aA|@kAxA_AbAa@j@c@x@_A|@o@vAa@h@[l@iAtAAPFf@A^St@WhAq@vBQt@YzBUjAy@rDM\\e@|Bs@hBi@hCm@~@]p@c@j@y@pAULw@v@{@`BMWIe@]aCG_AWmBYwDEQQ_@E?kAZk@TiBpAaAZSNL`AJjACTIFKQCcAOqA?_APw@hAeC^i@r@i@h@m@`@i@JWHw@W}CKi@GeAQiAe@}BmBaHEY",
//         "resource_state": 3,
//         "summary_polyline": "yrbyH|_{@z@tDrAxEiBmE_Cb@c@d@yCx@eBhANlBz@xDAx@p@hGP\\|@AjDyA|D_Cb@AI`@wCdDaA~Ag@jBTnEJ@Aa@UaCHSnE}BxAUXf@TfA|AxL^r@JE^mAjAgAp@}Br@aAh@eE~@aA\\w@fByJfBgH|@mCHc@GuAnAe@v@kB\\m@dDoDMSBIlBwC~AaAf@cA|@}@|LsGf@w@`Cc@~BuBx@Dr@hCj@v@`I|GrEfGZh@XtBt@fB`@jB|BfHl@dFnA|G@~@|@nGDdBf@~Cd@hFj@|Ch@|KDhEMl@F|CRzBb@~CZd@N`AXVt@hDn@nEDbAr@`CElCf@fBjBnEVxAn@bAxEnEfDjAbBEVU^F`BWdBy@hB_@PWl@A^m@`Au@l@MbBwApCgAjAGPc@dBcA^Fb@]jBTbBWbEgCd@w@XuA`@c@lAsC~@gCjAuD~A_GNyAA}@`@w@PuBv@yCJ{BLYFeApA_Ir@wB^cCrAmCJaAxAmEj@cCJkBfA_A`AyAdAkCkBg@q@c@iABk@m@cAWwCoCkCyEUEm@zAWX]hAuB`DGpAs@jCOfDIP_CzVNhE@dDu@rCsAtA}HnEqAvB{B`CiAtBiCzByBdAoDBoB_@qAk@uAyAgB_DeAsCgDkS_DiEm@M{@VgAlAy@rAsDnC[f@eCxBw@~DG`ANbF\\xAPjCx@fB\\pBXn@DdA`C|LBf@p@pB\\tCrDlG`AfAbBnAzDdAdCItFmBrBgAt@kAnEmA|BaBjCaAnCCjDu@vBcAlAaAlA_Dx@e@~@uDrAaD~BsH\\}B@iATw@\\U\\{B?i@j@mBRcCEo@TaD^}@j@mCf@iAf@{CjAuCnBeHz@eF~BoDr@mBqC}@_ALuBgAoB{A_AkAiAaC_AkAeFxJ}@zD{@jJShFw@tHKdE@pEa@tBuAxBwEfCqAfAyDlFuDdEwCbBkEh@eASgCgAsAoAkBmCmB}FMgCgAkEi@}Cq@cBqBcDc@UmAb@qBfCiI|Gi@yAk@OIQ[sF{@mFk@}Iw@}D]mDImCYqAMoB]yByBwHM_AmAcDy@mDoFcHuHiHk@}@o@yBi@EoBlAoCt@w@x@aE~AaGjDuDdDkC|CeAdB_A|@mBnDiAtABxA}AvFaA|FaDxLi@hCiDnFmAdA{@`Bu@_Ey@eJWq@}Bp@_E|BXlCM\\KQSuC?_APw@hAeC~CkDToA}@wIyCyL"
//     },
//     "trainer": false,
//     "commute": false,
//     "manual": false,
//     "private": false,
//     "visibility": "everyone",
//     "flagged": false,
//     "gear_id": "g11780356",
//     "start_latlng": [
//         51.46429010666907,
//         -0.3073466196656227
//     ],
//     "end_latlng": [
//         51.46433704532683,
//         -0.3073383215814829
//     ],
//     "average_speed": 3.495,
//     "max_speed": 5.182,
//     "average_cadence": 85.2,
//     "has_heartrate": true,
//     "average_heartrate": 168.5,
//     "max_heartrate": 184,
//     "heartrate_opt_out": false,
//     "display_hide_heartrate_option": true,
//     "elev_high": 13.2,
//     "elev_low": -36.6,
//     "upload_id": 8645012423,
//     "upload_id_str": "8645012423",
//     "external_id": "garmin_ping_246004498177",
//     "from_accepted_tag": false,
//     "pr_count": 33,
//     "total_photo_count": 0,
//     "has_kudoed": false,
//     "suffer_score": 282,
//     "description": "1:41:49,chip time. 37/425 (think most people didn't turn up because of the rain tbh). Pretty happy with that overall. Think I probably left 5-10 min on the table but it was like running in a bog. Endorphin Pros were slipping all over the grass portion of the course. Oh well! 1:30 next goal :)",
//     "calories": 1521,
//     "perceived_exertion": null,
//     "prefer_perceived_exertion": false,
//     "segment_efforts": [
//         {
//             "id": 3024290675801586000,
//             "resource_state": 2,
//             "name": "Old Deer Park 200m reps",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 60,
//             "moving_time": 60,
//             "start_date": "2022-11-06T09:08:40Z",
//             "start_date_local": "2022-11-06T09:08:40Z",
//             "distance": 192.4,
//             "start_index": 46,
//             "end_index": 60,
//             "average_cadence": 84.8,
//             "device_watts": false,
//             "average_heartrate": 163.1,
//             "max_heartrate": 165,
//             "segment": {
//                 "id": 15027549,
//                 "resource_state": 2,
//                 "name": "Old Deer Park 200m reps",
//                 "activity_type": "Run",
//                 "distance": 192.4,
//                 "average_grade": -0.5,
//                 "maximum_grade": 5.3,
//                 "elevation_high": 8.8,
//                 "elevation_low": 5.9,
//                 "start_latlng": [
//                     51.466065,
//                     -0.309653
//                 ],
//                 "end_latlng": [
//                     51.465549,
//                     -0.312292
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": null,
//             "achievements": [],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801785000,
//             "resource_state": 2,
//             "name": "Twickenham Bridge to Richmond Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 176,
//             "moving_time": 174,
//             "start_date": "2022-11-06T09:15:51Z",
//             "start_date_local": "2022-11-06T09:15:51Z",
//             "distance": 621.8,
//             "start_index": 181,
//             "end_index": 252,
//             "average_cadence": 85.5,
//             "device_watts": false,
//             "average_heartrate": 168.9,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 5525821,
//                 "resource_state": 2,
//                 "name": "Twickenham Bridge to Richmond Bridge",
//                 "activity_type": "Run",
//                 "distance": 621.8,
//                 "average_grade": 0.4,
//                 "maximum_grade": 3,
//                 "elevation_high": 9.8,
//                 "elevation_low": 6.1,
//                 "start_latlng": [
//                     51.46073,
//                     -0.31374
//                 ],
//                 "end_latlng": [
//                     51.457786,
//                     -0.306401
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": null,
//             "achievements": [],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800780300,
//             "resource_state": 2,
//             "name": "Richmond Upstream",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 404,
//             "moving_time": 402,
//             "start_date": "2022-11-06T09:15:51Z",
//             "start_date_local": "2022-11-06T09:15:51Z",
//             "distance": 1387.4,
//             "start_index": 181,
//             "end_index": 337,
//             "average_cadence": 85,
//             "device_watts": false,
//             "average_heartrate": 169,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 6495541,
//                 "resource_state": 2,
//                 "name": "Richmond Upstream",
//                 "activity_type": "Run",
//                 "distance": 1387.4,
//                 "average_grade": 0.1,
//                 "maximum_grade": 4,
//                 "elevation_high": 12.8,
//                 "elevation_low": 6.2,
//                 "start_latlng": [
//                     51.460843,
//                     -0.313887
//                 ],
//                 "end_latlng": [
//                     51.451788,
//                     -0.301878
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": null,
//             "achievements": [],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799905000,
//             "resource_state": 2,
//             "name": "DRC Home Stretch",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 101,
//             "moving_time": 101,
//             "start_date": "2022-11-06T09:16:23Z",
//             "start_date_local": "2022-11-06T09:16:23Z",
//             "distance": 421,
//             "start_index": 201,
//             "end_index": 236,
//             "average_cadence": 85.7,
//             "device_watts": false,
//             "average_heartrate": 169.1,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 8772880,
//                 "resource_state": 2,
//                 "name": "DRC Home Stretch",
//                 "activity_type": "Run",
//                 "distance": 421,
//                 "average_grade": 0.7,
//                 "maximum_grade": 9.9,
//                 "elevation_high": 9.8,
//                 "elevation_low": 6.7,
//                 "start_latlng": [
//                     51.460473,
//                     -0.312303
//                 ],
//                 "end_latlng": [
//                     51.459222,
//                     -0.307355
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": null,
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": null,
//             "achievements": [],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801801000,
//             "resource_state": 2,
//             "name": "Richmond Bridge to Teddington Lock, Riverside",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 1286,
//             "moving_time": 1283,
//             "start_date": "2022-11-06T09:19:06Z",
//             "start_date_local": "2022-11-06T09:19:06Z",
//             "distance": 4465.65,
//             "start_index": 256,
//             "end_index": 856,
//             "average_cadence": 85,
//             "device_watts": false,
//             "average_heartrate": 164.2,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 1266020,
//                 "resource_state": 2,
//                 "name": "Richmond Bridge to Teddington Lock, Riverside",
//                 "activity_type": "Run",
//                 "distance": 4465.65,
//                 "average_grade": -0.1,
//                 "maximum_grade": 5,
//                 "elevation_high": 12.6,
//                 "elevation_low": 4.1,
//                 "start_latlng": [
//                     51.457635639788535,
//                     -0.30617382531520015
//                 ],
//                 "end_latlng": [
//                     51.4313693588571,
//                     -0.32200811238559396
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "Greater London",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675802099000,
//             "resource_state": 2,
//             "name": "Tortoise vs Hare 5k 1st half",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 654,
//             "moving_time": 654,
//             "start_date": "2022-11-06T09:19:06Z",
//             "start_date_local": "2022-11-06T09:19:06Z",
//             "distance": 2269,
//             "start_index": 256,
//             "end_index": 498,
//             "average_cadence": 84.7,
//             "device_watts": false,
//             "average_heartrate": 165.5,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 26556874,
//                 "resource_state": 2,
//                 "name": "Tortoise vs Hare 5k 1st half",
//                 "activity_type": "Run",
//                 "distance": 2269,
//                 "average_grade": 0,
//                 "maximum_grade": 1.5,
//                 "elevation_high": 6.3,
//                 "elevation_low": 4.3,
//                 "start_latlng": [
//                     51.457563,
//                     -0.306229
//                 ],
//                 "end_latlng": [
//                     51.445591,
//                     -0.320602
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801593300,
//             "resource_state": 2,
//             "name": "Bridge to Gardens ",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 191,
//             "moving_time": 191,
//             "start_date": "2022-11-06T09:19:11Z",
//             "start_date_local": "2022-11-06T09:19:11Z",
//             "distance": 639.5,
//             "start_index": 258,
//             "end_index": 331,
//             "average_cadence": 84.7,
//             "device_watts": false,
//             "average_heartrate": 169.1,
//             "max_heartrate": 173,
//             "segment": {
//                 "id": 10590949,
//                 "resource_state": 2,
//                 "name": "Bridge to Gardens ",
//                 "activity_type": "Run",
//                 "distance": 639.5,
//                 "average_grade": -0.1,
//                 "maximum_grade": 5.6,
//                 "elevation_high": 12.9,
//                 "elevation_low": 9.1,
//                 "start_latlng": [
//                     51.457203,
//                     -0.305778
//                 ],
//                 "end_latlng": [
//                     51.452057,
//                     -0.301893
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": null,
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799851500,
//             "resource_state": 2,
//             "name": "Petersham Meadow to Ham house Launch",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 402,
//             "moving_time": 402,
//             "start_date": "2022-11-06T09:22:35Z",
//             "start_date_local": "2022-11-06T09:22:35Z",
//             "distance": 1407.9,
//             "start_index": 337,
//             "end_index": 481,
//             "average_cadence": 84.7,
//             "device_watts": false,
//             "average_heartrate": 164.2,
//             "max_heartrate": 170,
//             "segment": {
//                 "id": 24025543,
//                 "resource_state": 2,
//                 "name": "Petersham Meadow to Ham house Launch",
//                 "activity_type": "Run",
//                 "distance": 1407.9,
//                 "average_grade": -0.1,
//                 "maximum_grade": 6.4,
//                 "elevation_high": -7.4,
//                 "elevation_low": -11.8,
//                 "start_latlng": [
//                     51.451608,
//                     -0.301707
//                 ],
//                 "end_latlng": [
//                     51.445471,
//                     -0.318411
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799196000,
//             "resource_state": 2,
//             "name": "Petersham Meadow to TYM Lock",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 797,
//             "moving_time": 796,
//             "start_date": "2022-11-06T09:22:42Z",
//             "start_date_local": "2022-11-06T09:22:42Z",
//             "distance": 2743.4,
//             "start_index": 341,
//             "end_index": 707,
//             "average_cadence": 85.1,
//             "device_watts": false,
//             "average_heartrate": 163,
//             "max_heartrate": 170,
//             "segment": {
//                 "id": 27247980,
//                 "resource_state": 2,
//                 "name": "Petersham Meadow to TYM Lock",
//                 "activity_type": "Run",
//                 "distance": 2743.4,
//                 "average_grade": 0.1,
//                 "maximum_grade": 4.4,
//                 "elevation_high": 7.4,
//                 "elevation_low": 4.4,
//                 "start_latlng": [
//                     51.451575,
//                     -0.302137
//                 ],
//                 "end_latlng": [
//                     51.43805,
//                     -0.328764
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801243000,
//             "resource_state": 2,
//             "name": "Petersham towpath towards Teddington",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 101,
//             "moving_time": 101,
//             "start_date": "2022-11-06T09:22:57Z",
//             "start_date_local": "2022-11-06T09:22:57Z",
//             "distance": 349.69,
//             "start_index": 347,
//             "end_index": 379,
//             "average_cadence": 84.5,
//             "device_watts": false,
//             "average_heartrate": 164.9,
//             "max_heartrate": 166,
//             "segment": {
//                 "id": 2311172,
//                 "resource_state": 2,
//                 "name": "Petersham towpath towards Teddington",
//                 "activity_type": "Run",
//                 "distance": 349.69,
//                 "average_grade": 1.6,
//                 "maximum_grade": 3.6,
//                 "elevation_high": 9.6,
//                 "elevation_low": 4,
//                 "start_latlng": [
//                     51.451231847384186,
//                     -0.3027724472956278
//                 ],
//                 "end_latlng": [
//                     51.44863077877447,
//                     -0.3055747578736564
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "Greater London",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801769500,
//             "resource_state": 2,
//             "name": "Petersham to Eel Pie End",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 487,
//             "moving_time": 487,
//             "start_date": "2022-11-06T09:24:43Z",
//             "start_date_local": "2022-11-06T09:24:43Z",
//             "distance": 1658.2,
//             "start_index": 380,
//             "end_index": 586,
//             "average_cadence": 85.1,
//             "device_watts": false,
//             "average_heartrate": 162.9,
//             "max_heartrate": 167,
//             "segment": {
//                 "id": 19018117,
//                 "resource_state": 2,
//                 "name": "Petersham to Eel Pie End",
//                 "activity_type": "Run",
//                 "distance": 1658.2,
//                 "average_grade": 0.1,
//                 "maximum_grade": 6.5,
//                 "elevation_high": 10.8,
//                 "elevation_low": 8.8,
//                 "start_latlng": [
//                     51.448512,
//                     -0.305848
//                 ],
//                 "end_latlng": [
//                     51.443336,
//                     -0.327771
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800149500,
//             "resource_state": 2,
//             "name": "Ham House Launch to TYM Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 409,
//             "moving_time": 408,
//             "start_date": "2022-11-06T09:29:15Z",
//             "start_date_local": "2022-11-06T09:29:15Z",
//             "distance": 1461,
//             "start_index": 480,
//             "end_index": 708,
//             "average_cadence": 85.5,
//             "device_watts": false,
//             "average_heartrate": 162,
//             "max_heartrate": 167,
//             "segment": {
//                 "id": 24025595,
//                 "resource_state": 2,
//                 "name": "Ham House Launch to TYM Bridge",
//                 "activity_type": "Run",
//                 "distance": 1461,
//                 "average_grade": 0.5,
//                 "maximum_grade": 6.1,
//                 "elevation_high": -8,
//                 "elevation_low": -16.2,
//                 "start_latlng": [
//                     51.445597,
//                     -0.318357
//                 ],
//                 "end_latlng": [
//                     51.437939,
//                     -0.328606
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800684000,
//             "resource_state": 2,
//             "name": "Ham House to Teddington Lock",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 670,
//             "moving_time": 667,
//             "start_date": "2022-11-06T09:29:17Z",
//             "start_date_local": "2022-11-06T09:29:17Z",
//             "distance": 2296.9,
//             "start_index": 481,
//             "end_index": 855,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 162.9,
//             "max_heartrate": 169,
//             "segment": {
//                 "id": 6835696,
//                 "resource_state": 2,
//                 "name": "Ham House to Teddington Lock",
//                 "activity_type": "Run",
//                 "distance": 2296.9,
//                 "average_grade": -0.1,
//                 "maximum_grade": 2.8,
//                 "elevation_high": 10,
//                 "elevation_low": 5.1,
//                 "start_latlng": [
//                     51.445556,
//                     -0.318392
//                 ],
//                 "end_latlng": [
//                     51.431276,
//                     -0.322439
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801072000,
//             "resource_state": 2,
//             "name": "ODP half - Ham loop (2016)",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 1739,
//             "moving_time": 1734,
//             "start_date": "2022-11-06T09:30:00Z",
//             "start_date_local": "2022-11-06T09:30:00Z",
//             "distance": 6043.8,
//             "start_index": 498,
//             "end_index": 1322,
//             "average_cadence": 85.1,
//             "device_watts": false,
//             "average_heartrate": 164.6,
//             "max_heartrate": 170,
//             "segment": {
//                 "id": 11431043,
//                 "resource_state": 2,
//                 "name": "ODP half - Ham loop (2016)",
//                 "activity_type": "Run",
//                 "distance": 6043.8,
//                 "average_grade": 0,
//                 "maximum_grade": 2.7,
//                 "elevation_high": 11,
//                 "elevation_low": 5,
//                 "start_latlng": [
//                     51.445554,
//                     -0.320525
//                 ],
//                 "end_latlng": [
//                     51.445049,
//                     -0.318263
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": null,
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675802104300,
//             "resource_state": 2,
//             "name": "Young Mariners bridge to Footbridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 282,
//             "moving_time": 280,
//             "start_date": "2022-11-06T09:35:55Z",
//             "start_date_local": "2022-11-06T09:35:55Z",
//             "distance": 999.1,
//             "start_index": 705,
//             "end_index": 859,
//             "average_cadence": 84.9,
//             "device_watts": false,
//             "average_heartrate": 164.1,
//             "max_heartrate": 169,
//             "segment": {
//                 "id": 26264009,
//                 "resource_state": 2,
//                 "name": "Young Mariners bridge to Footbridge",
//                 "activity_type": "Run",
//                 "distance": 999.1,
//                 "average_grade": 0,
//                 "maximum_grade": 2.9,
//                 "elevation_high": 7.5,
//                 "elevation_low": 5.1,
//                 "start_latlng": [
//                     51.438178,
//                     -0.3288
//                 ],
//                 "end_latlng": [
//                     51.431395,
//                     -0.321695
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799163400,
//             "resource_state": 2,
//             "name": "Bridge in Sight",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 95,
//             "moving_time": 95,
//             "start_date": "2022-11-06T09:39:14Z",
//             "start_date_local": "2022-11-06T09:39:14Z",
//             "distance": 331,
//             "start_index": 819,
//             "end_index": 864,
//             "average_cadence": 84.8,
//             "device_watts": false,
//             "average_heartrate": 163.1,
//             "max_heartrate": 164,
//             "segment": {
//                 "id": 26365227,
//                 "resource_state": 2,
//                 "name": "Bridge in Sight",
//                 "activity_type": "Run",
//                 "distance": 331,
//                 "average_grade": 0.4,
//                 "maximum_grade": 2.1,
//                 "elevation_high": 6.9,
//                 "elevation_low": 5.5,
//                 "start_latlng": [
//                     51.432512,
//                     -0.325431
//                 ],
//                 "end_latlng": [
//                     51.431009,
//                     -0.321443
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Teddington",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800860000,
//             "resource_state": 2,
//             "name": "River trot",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 122,
//             "moving_time": 120,
//             "start_date": "2022-11-06T09:39:30Z",
//             "start_date_local": "2022-11-06T09:39:30Z",
//             "distance": 425,
//             "start_index": 829,
//             "end_index": 894,
//             "average_cadence": 84.6,
//             "device_watts": false,
//             "average_heartrate": 163,
//             "max_heartrate": 164,
//             "segment": {
//                 "id": 7190195,
//                 "resource_state": 2,
//                 "name": "River trot",
//                 "activity_type": "Run",
//                 "distance": 425,
//                 "average_grade": 0.1,
//                 "maximum_grade": 3,
//                 "elevation_high": 7.9,
//                 "elevation_low": 6.1,
//                 "start_latlng": [
//                     51.432162,
//                     -0.324926
//                 ],
//                 "end_latlng": [
//                     51.430656,
//                     -0.319711
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801702000,
//             "resource_state": 2,
//             "name": "Northweald path up from river",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 120,
//             "moving_time": 120,
//             "start_date": "2022-11-06T09:45:05Z",
//             "start_date_local": "2022-11-06T09:45:05Z",
//             "distance": 417.8,
//             "start_index": 1005,
//             "end_index": 1064,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 166.7,
//             "max_heartrate": 169,
//             "segment": {
//                 "id": 25365955,
//                 "resource_state": 2,
//                 "name": "Northweald path up from river",
//                 "activity_type": "Run",
//                 "distance": 417.8,
//                 "average_grade": 0.2,
//                 "maximum_grade": 0.4,
//                 "elevation_high": 8.3,
//                 "elevation_low": 7.6,
//                 "start_latlng": [
//                     51.427278,
//                     -0.310705
//                 ],
//                 "end_latlng": [
//                     51.430535,
//                     -0.30833
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675798986000,
//             "resource_state": 2,
//             "name": "Ham Riverside Drive North",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 372,
//             "moving_time": 372,
//             "start_date": "2022-11-06T09:50:59Z",
//             "start_date_local": "2022-11-06T09:50:59Z",
//             "distance": 1294.9,
//             "start_index": 1164,
//             "end_index": 1279,
//             "average_cadence": 85.4,
//             "device_watts": false,
//             "average_heartrate": 165.5,
//             "max_heartrate": 169,
//             "segment": {
//                 "id": 6856082,
//                 "resource_state": 2,
//                 "name": "Ham Riverside Drive North",
//                 "activity_type": "Run",
//                 "distance": 1294.9,
//                 "average_grade": -0.1,
//                 "maximum_grade": 1.3,
//                 "elevation_high": 11,
//                 "elevation_low": 8.9,
//                 "start_latlng": [
//                     51.433204,
//                     -0.318666
//                 ],
//                 "end_latlng": [
//                     51.441923,
//                     -0.315871
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799920000,
//             "resource_state": 2,
//             "name": "Rapid riverside",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 138,
//             "moving_time": 138,
//             "start_date": "2022-11-06T09:52:31Z",
//             "start_date_local": "2022-11-06T09:52:31Z",
//             "distance": 473.5,
//             "start_index": 1191,
//             "end_index": 1232,
//             "average_cadence": 85.9,
//             "device_watts": false,
//             "average_heartrate": 166.7,
//             "max_heartrate": 169,
//             "segment": {
//                 "id": 14317287,
//                 "resource_state": 2,
//                 "name": "Rapid riverside",
//                 "activity_type": "Run",
//                 "distance": 473.5,
//                 "average_grade": 0,
//                 "maximum_grade": 0.7,
//                 "elevation_high": 10,
//                 "elevation_low": 9,
//                 "start_latlng": [
//                     51.435727,
//                     -0.32114
//                 ],
//                 "end_latlng": [
//                     51.439656,
//                     -0.322049
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800895000,
//             "resource_state": 2,
//             "name": "Ham House to Teddington Lock",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 652,
//             "moving_time": 652,
//             "start_date": "2022-11-06T09:59:11Z",
//             "start_date_local": "2022-11-06T09:59:11Z",
//             "distance": 2296.9,
//             "start_index": 1325,
//             "end_index": 1569,
//             "average_cadence": 85.4,
//             "device_watts": false,
//             "average_heartrate": 170.2,
//             "max_heartrate": 178,
//             "segment": {
//                 "id": 6835696,
//                 "resource_state": 2,
//                 "name": "Ham House to Teddington Lock",
//                 "activity_type": "Run",
//                 "distance": 2296.9,
//                 "average_grade": -0.1,
//                 "maximum_grade": 2.8,
//                 "elevation_high": 10,
//                 "elevation_low": 5.1,
//                 "start_latlng": [
//                     51.445556,
//                     -0.318392
//                 ],
//                 "end_latlng": [
//                     51.431276,
//                     -0.322439
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801499000,
//             "resource_state": 2,
//             "name": "Ham House Launch to TYM Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 396,
//             "moving_time": 396,
//             "start_date": "2022-11-06T09:59:11Z",
//             "start_date_local": "2022-11-06T09:59:11Z",
//             "distance": 1461,
//             "start_index": 1325,
//             "end_index": 1467,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 168.8,
//             "max_heartrate": 176,
//             "segment": {
//                 "id": 24025595,
//                 "resource_state": 2,
//                 "name": "Ham House Launch to TYM Bridge",
//                 "activity_type": "Run",
//                 "distance": 1461,
//                 "average_grade": 0.5,
//                 "maximum_grade": 6.1,
//                 "elevation_high": -8,
//                 "elevation_low": -16.2,
//                 "start_latlng": [
//                     51.445597,
//                     -0.318357
//                 ],
//                 "end_latlng": [
//                     51.437939,
//                     -0.328606
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801611000,
//             "resource_state": 2,
//             "name": "ODP half - Ham loop (2016)",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 1719,
//             "moving_time": 1718,
//             "start_date": "2022-11-06T09:59:53Z",
//             "start_date_local": "2022-11-06T09:59:53Z",
//             "distance": 6043.8,
//             "start_index": 1337,
//             "end_index": 1876,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 171.3,
//             "max_heartrate": 181,
//             "segment": {
//                 "id": 11431043,
//                 "resource_state": 2,
//                 "name": "ODP half - Ham loop (2016)",
//                 "activity_type": "Run",
//                 "distance": 6043.8,
//                 "average_grade": 0,
//                 "maximum_grade": 2.7,
//                 "elevation_high": 11,
//                 "elevation_low": 5,
//                 "start_latlng": [
//                     51.445554,
//                     -0.320525
//                 ],
//                 "end_latlng": [
//                     51.445049,
//                     -0.318263
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": null,
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799148000,
//             "resource_state": 2,
//             "name": "Young Mariners bridge to Footbridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 284,
//             "moving_time": 284,
//             "start_date": "2022-11-06T10:05:38Z",
//             "start_date_local": "2022-11-06T10:05:38Z",
//             "distance": 999.1,
//             "start_index": 1464,
//             "end_index": 1574,
//             "average_cadence": 85.6,
//             "device_watts": false,
//             "average_heartrate": 172.6,
//             "max_heartrate": 178,
//             "segment": {
//                 "id": 26264009,
//                 "resource_state": 2,
//                 "name": "Young Mariners bridge to Footbridge",
//                 "activity_type": "Run",
//                 "distance": 999.1,
//                 "average_grade": 0,
//                 "maximum_grade": 2.9,
//                 "elevation_high": 7.5,
//                 "elevation_low": 5.1,
//                 "start_latlng": [
//                     51.438178,
//                     -0.3288
//                 ],
//                 "end_latlng": [
//                     51.431395,
//                     -0.321695
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799959000,
//             "resource_state": 2,
//             "name": "Bridge in Sight",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 95,
//             "moving_time": 95,
//             "start_date": "2022-11-06T10:08:54Z",
//             "start_date_local": "2022-11-06T10:08:54Z",
//             "distance": 331,
//             "start_index": 1547,
//             "end_index": 1577,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 173.8,
//             "max_heartrate": 178,
//             "segment": {
//                 "id": 26365227,
//                 "resource_state": 2,
//                 "name": "Bridge in Sight",
//                 "activity_type": "Run",
//                 "distance": 331,
//                 "average_grade": 0.4,
//                 "maximum_grade": 2.1,
//                 "elevation_high": 6.9,
//                 "elevation_low": 5.5,
//                 "start_latlng": [
//                     51.432512,
//                     -0.325431
//                 ],
//                 "end_latlng": [
//                     51.431009,
//                     -0.321443
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Teddington",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801975300,
//             "resource_state": 2,
//             "name": "River trot",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 122,
//             "moving_time": 122,
//             "start_date": "2022-11-06T10:09:06Z",
//             "start_date_local": "2022-11-06T10:09:06Z",
//             "distance": 425,
//             "start_index": 1551,
//             "end_index": 1591,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 172.6,
//             "max_heartrate": 178,
//             "segment": {
//                 "id": 7190195,
//                 "resource_state": 2,
//                 "name": "River trot",
//                 "activity_type": "Run",
//                 "distance": 425,
//                 "average_grade": 0.1,
//                 "maximum_grade": 3,
//                 "elevation_high": 7.9,
//                 "elevation_low": 6.1,
//                 "start_latlng": [
//                     51.432162,
//                     -0.324926
//                 ],
//                 "end_latlng": [
//                     51.430656,
//                     -0.319711
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799064000,
//             "resource_state": 2,
//             "name": "Northweald path up from river",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 123,
//             "moving_time": 123,
//             "start_date": "2022-11-06T10:14:39Z",
//             "start_date_local": "2022-11-06T10:14:39Z",
//             "distance": 417.8,
//             "start_index": 1668,
//             "end_index": 1703,
//             "average_cadence": 85.4,
//             "device_watts": false,
//             "average_heartrate": 169.6,
//             "max_heartrate": 174,
//             "segment": {
//                 "id": 25365955,
//                 "resource_state": 2,
//                 "name": "Northweald path up from river",
//                 "activity_type": "Run",
//                 "distance": 417.8,
//                 "average_grade": 0.2,
//                 "maximum_grade": 0.4,
//                 "elevation_high": 8.3,
//                 "elevation_low": 7.6,
//                 "start_latlng": [
//                     51.427278,
//                     -0.310705
//                 ],
//                 "end_latlng": [
//                     51.430535,
//                     -0.30833
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800775000,
//             "resource_state": 2,
//             "name": "Ham Riverside Drive North",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 383,
//             "moving_time": 383,
//             "start_date": "2022-11-06T10:20:28Z",
//             "start_date_local": "2022-11-06T10:20:28Z",
//             "distance": 1294.9,
//             "start_index": 1756,
//             "end_index": 1851,
//             "average_cadence": 84.8,
//             "device_watts": false,
//             "average_heartrate": 174.6,
//             "max_heartrate": 181,
//             "segment": {
//                 "id": 6856082,
//                 "resource_state": 2,
//                 "name": "Ham Riverside Drive North",
//                 "activity_type": "Run",
//                 "distance": 1294.9,
//                 "average_grade": -0.1,
//                 "maximum_grade": 1.3,
//                 "elevation_high": 11,
//                 "elevation_low": 8.9,
//                 "start_latlng": [
//                     51.433204,
//                     -0.318666
//                 ],
//                 "end_latlng": [
//                     51.441923,
//                     -0.315871
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675798958600,
//             "resource_state": 2,
//             "name": "Rapid riverside",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 146,
//             "moving_time": 146,
//             "start_date": "2022-11-06T10:22:03Z",
//             "start_date_local": "2022-11-06T10:22:03Z",
//             "distance": 473.5,
//             "start_index": 1779,
//             "end_index": 1814,
//             "average_cadence": 84.8,
//             "device_watts": false,
//             "average_heartrate": 178.1,
//             "max_heartrate": 181,
//             "segment": {
//                 "id": 14317287,
//                 "resource_state": 2,
//                 "name": "Rapid riverside",
//                 "activity_type": "Run",
//                 "distance": 473.5,
//                 "average_grade": 0,
//                 "maximum_grade": 0.7,
//                 "elevation_high": 10,
//                 "elevation_low": 9,
//                 "start_latlng": [
//                     51.435727,
//                     -0.32114
//                 ],
//                 "end_latlng": [
//                     51.439656,
//                     -0.322049
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801954000,
//             "resource_state": 2,
//             "name": "Ham House to River Lane",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 267,
//             "moving_time": 267,
//             "start_date": "2022-11-06T10:28:40Z",
//             "start_date_local": "2022-11-06T10:28:40Z",
//             "distance": 980.5,
//             "start_index": 1879,
//             "end_index": 1953,
//             "average_cadence": 86.4,
//             "device_watts": false,
//             "average_heartrate": 174.7,
//             "max_heartrate": 180,
//             "segment": {
//                 "id": 15856304,
//                 "resource_state": 2,
//                 "name": "Ham House to River Lane",
//                 "activity_type": "Run",
//                 "distance": 980.5,
//                 "average_grade": 0,
//                 "maximum_grade": 5.4,
//                 "elevation_high": 12,
//                 "elevation_low": 6.9,
//                 "start_latlng": [
//                     51.44553,
//                     -0.318852
//                 ],
//                 "end_latlng": [
//                     51.448409,
//                     -0.30581
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": null,
//             "achievements": [],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801253400,
//             "resource_state": 2,
//             "name": "Ham House to A316 Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 765,
//             "moving_time": 764,
//             "start_date": "2022-11-06T10:28:58Z",
//             "start_date_local": "2022-11-06T10:28:58Z",
//             "distance": 2748.2,
//             "start_index": 1887,
//             "end_index": 2086,
//             "average_cadence": 85.5,
//             "device_watts": false,
//             "average_heartrate": 174.3,
//             "max_heartrate": 180,
//             "segment": {
//                 "id": 17795780,
//                 "resource_state": 2,
//                 "name": "Ham House to A316 Bridge",
//                 "activity_type": "Run",
//                 "distance": 2748.2,
//                 "average_grade": 0,
//                 "maximum_grade": 5.8,
//                 "elevation_high": 21.6,
//                 "elevation_low": 15.8,
//                 "start_latlng": [
//                     51.445551,
//                     -0.317769
//                 ],
//                 "end_latlng": [
//                     51.460848,
//                     -0.313775
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801357000,
//             "resource_state": 2,
//             "name": "Car Park to Canoe Club",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 442,
//             "moving_time": 441,
//             "start_date": "2022-11-06T10:29:00Z",
//             "start_date_local": "2022-11-06T10:29:00Z",
//             "distance": 1575.3,
//             "start_index": 1888,
//             "end_index": 2006,
//             "average_cadence": 85.8,
//             "device_watts": false,
//             "average_heartrate": 174.7,
//             "max_heartrate": 180,
//             "segment": {
//                 "id": 19368188,
//                 "resource_state": 2,
//                 "name": "Car Park to Canoe Club",
//                 "activity_type": "Run",
//                 "distance": 1575.3,
//                 "average_grade": 0,
//                 "maximum_grade": 2.1,
//                 "elevation_high": 6.4,
//                 "elevation_low": 3.7,
//                 "start_latlng": [
//                     51.445708,
//                     -0.317617
//                 ],
//                 "end_latlng": [
//                     51.453706,
//                     -0.302968
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": null,
//                 "state": null,
//                 "country": null,
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675800385000,
//             "resource_state": 2,
//             "name": "Petersham to Richmond Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 364,
//             "moving_time": 363,
//             "start_date": "2022-11-06T10:32:30Z",
//             "start_date_local": "2022-11-06T10:32:30Z",
//             "distance": 1308.2,
//             "start_index": 1943,
//             "end_index": 2038,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 174.3,
//             "max_heartrate": 180,
//             "segment": {
//                 "id": 24841316,
//                 "resource_state": 2,
//                 "name": "Petersham to Richmond Bridge",
//                 "activity_type": "Run",
//                 "distance": 1308.2,
//                 "average_grade": 0,
//                 "maximum_grade": 1.4,
//                 "elevation_high": 5.7,
//                 "elevation_low": 4.4,
//                 "start_latlng": [
//                     51.447912,
//                     -0.307534
//                 ],
//                 "end_latlng": [
//                     51.457544,
//                     -0.306101
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801303600,
//             "resource_state": 2,
//             "name": "Petersham towpath towards Richmond",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 102,
//             "moving_time": 101,
//             "start_date": "2022-11-06T10:33:15Z",
//             "start_date_local": "2022-11-06T10:33:15Z",
//             "distance": 351.16,
//             "start_index": 1955,
//             "end_index": 1978,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 174.4,
//             "max_heartrate": 176,
//             "segment": {
//                 "id": 2311183,
//                 "resource_state": 2,
//                 "name": "Petersham towpath towards Richmond",
//                 "activity_type": "Run",
//                 "distance": 351.16,
//                 "average_grade": -1.3,
//                 "maximum_grade": 2.8,
//                 "elevation_high": 9.2,
//                 "elevation_low": 4,
//                 "start_latlng": [
//                     51.44873252294691,
//                     -0.30550825969078343
//                 ],
//                 "end_latlng": [
//                     51.45136398073574,
//                     -0.3027330630220562
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Twickenham",
//                 "state": "Greater London",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675798863400,
//             "resource_state": 2,
//             "name": "Head for the Bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 197,
//             "moving_time": 197,
//             "start_date": "2022-11-06T10:35:23Z",
//             "start_date_local": "2022-11-06T10:35:23Z",
//             "distance": 714.8,
//             "start_index": 1987,
//             "end_index": 2039,
//             "average_cadence": 84.9,
//             "device_watts": false,
//             "average_heartrate": 173.4,
//             "max_heartrate": 176,
//             "segment": {
//                 "id": 5383694,
//                 "resource_state": 2,
//                 "name": "Head for the Bridge",
//                 "activity_type": "Run",
//                 "distance": 714.8,
//                 "average_grade": 0.2,
//                 "maximum_grade": 4.1,
//                 "elevation_high": 12.3,
//                 "elevation_low": 9.2,
//                 "start_latlng": [
//                     51.451858,
//                     -0.301901
//                 ],
//                 "end_latlng": [
//                     51.457589,
//                     -0.306315
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675801606700,
//             "resource_state": 2,
//             "name": "Irena Fudal my late mother in law segment  ",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 72,
//             "moving_time": 72,
//             "start_date": "2022-11-06T10:38:48Z",
//             "start_date_local": "2022-11-06T10:38:48Z",
//             "distance": 265.2,
//             "start_index": 2041,
//             "end_index": 2060,
//             "average_cadence": 85.4,
//             "device_watts": false,
//             "average_heartrate": 173.6,
//             "max_heartrate": 175,
//             "segment": {
//                 "id": 11946093,
//                 "resource_state": 2,
//                 "name": "Irena Fudal my late mother in law segment  ",
//                 "activity_type": "Run",
//                 "distance": 265.2,
//                 "average_grade": -0.9,
//                 "maximum_grade": 1.9,
//                 "elevation_high": 9.8,
//                 "elevation_low": 6.1,
//                 "start_latlng": [
//                     51.45788,
//                     -0.306337
//                 ],
//                 "end_latlng": [
//                     51.459171,
//                     -0.309252
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": null,
//                 "state": null,
//                 "country": null,
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         },
//         {
//             "id": 3024290675799456300,
//             "resource_state": 2,
//             "name": "Richmond bridge-Twickenham bridge",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 147,
//             "moving_time": 147,
//             "start_date": "2022-11-06T10:38:54Z",
//             "start_date_local": "2022-11-06T10:38:54Z",
//             "distance": 529.3,
//             "start_index": 2042,
//             "end_index": 2081,
//             "average_cadence": 85.4,
//             "device_watts": false,
//             "average_heartrate": 174.3,
//             "max_heartrate": 178,
//             "segment": {
//                 "id": 4256995,
//                 "resource_state": 2,
//                 "name": "Richmond bridge-Twickenham bridge",
//                 "activity_type": "Run",
//                 "distance": 529.3,
//                 "average_grade": -0.6,
//                 "maximum_grade": 2,
//                 "elevation_high": 9.6,
//                 "elevation_low": 6.1,
//                 "start_latlng": [
//                     51.45808,
//                     -0.306663
//                 ],
//                 "end_latlng": [
//                     51.460481,
//                     -0.312965
//                 ],
//                 "elevation_profile": null,
//                 "climb_category": 0,
//                 "city": "Richmond",
//                 "state": "England",
//                 "country": "United Kingdom",
//                 "private": false,
//                 "hazardous": false,
//                 "starred": false
//             },
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ],
//             "kom_rank": null,
//             "hidden": false
//         }
//     ],
//     "splits_metric": [
//         {
//             "distance": 1000.1,
//             "elapsed_time": 310,
//             "elevation_difference": -2,
//             "moving_time": 310,
//             "split": 1,
//             "average_speed": 3.23,
//             "average_grade_adjusted_speed": 3.22,
//             "average_heartrate": 155.80322580645162,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1001,
//             "elapsed_time": 289,
//             "elevation_difference": -4.6,
//             "moving_time": 289,
//             "split": 2,
//             "average_speed": 3.46,
//             "average_grade_adjusted_speed": 3.86,
//             "average_heartrate": 169.97231833910035,
//             "pace_zone": 3
//         },
//         {
//             "distance": 999.5,
//             "elapsed_time": 289,
//             "elevation_difference": 11.8,
//             "moving_time": 289,
//             "split": 3,
//             "average_speed": 3.46,
//             "average_grade_adjusted_speed": 4.06,
//             "average_heartrate": 169.3588850174216,
//             "pace_zone": 4
//         },
//         {
//             "distance": 1001.9,
//             "elapsed_time": 289,
//             "elevation_difference": 4,
//             "moving_time": 289,
//             "split": 4,
//             "average_speed": 3.47,
//             "average_grade_adjusted_speed": 3.74,
//             "average_heartrate": 166.318339100346,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1011,
//             "elapsed_time": 290,
//             "elevation_difference": 2.2,
//             "moving_time": 290,
//             "split": 5,
//             "average_speed": 3.49,
//             "average_grade_adjusted_speed": 3.74,
//             "average_heartrate": 162.9344827586207,
//             "pace_zone": 3
//         },
//         {
//             "distance": 989.6,
//             "elapsed_time": 295,
//             "elevation_difference": 2.6,
//             "moving_time": 295,
//             "split": 6,
//             "average_speed": 3.35,
//             "average_grade_adjusted_speed": 5.37,
//             "average_heartrate": 161.81632653061226,
//             "pace_zone": 6
//         },
//         {
//             "distance": 1003.2,
//             "elapsed_time": 278,
//             "elevation_difference": -4.4,
//             "moving_time": 278,
//             "split": 7,
//             "average_speed": 3.61,
//             "average_grade_adjusted_speed": 5.2,
//             "average_heartrate": 164.29347826086956,
//             "pace_zone": 6
//         },
//         {
//             "distance": 998,
//             "elapsed_time": 287,
//             "elevation_difference": -10.2,
//             "moving_time": 287,
//             "split": 8,
//             "average_speed": 3.48,
//             "average_grade_adjusted_speed": 5,
//             "average_heartrate": 164.0280701754386,
//             "pace_zone": 6
//         },
//         {
//             "distance": 997.3,
//             "elapsed_time": 282,
//             "elevation_difference": 7.4,
//             "moving_time": 282,
//             "split": 9,
//             "average_speed": 3.54,
//             "average_grade_adjusted_speed": 5.11,
//             "average_heartrate": 166.07801418439718,
//             "pace_zone": 6
//         },
//         {
//             "distance": 1012.1,
//             "elapsed_time": 284,
//             "elevation_difference": -0.8,
//             "moving_time": 284,
//             "split": 10,
//             "average_speed": 3.56,
//             "average_grade_adjusted_speed": 3.66,
//             "average_heartrate": 165.91549295774647,
//             "pace_zone": 3
//         },
//         {
//             "distance": 993.4,
//             "elapsed_time": 285,
//             "elevation_difference": -3.4,
//             "moving_time": 285,
//             "split": 11,
//             "average_speed": 3.49,
//             "average_grade_adjusted_speed": 3.85,
//             "average_heartrate": 165.53333333333333,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1001.4,
//             "elapsed_time": 292,
//             "elevation_difference": -5,
//             "moving_time": 292,
//             "split": 12,
//             "average_speed": 3.43,
//             "average_grade_adjusted_speed": 3.82,
//             "average_heartrate": 168.9417808219178,
//             "pace_zone": 3
//         },
//         {
//             "distance": 992.7,
//             "elapsed_time": 280,
//             "elevation_difference": -20,
//             "moving_time": 280,
//             "split": 13,
//             "average_speed": 3.55,
//             "average_grade_adjusted_speed": 3.59,
//             "average_heartrate": 170.3892857142857,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1000.7,
//             "elapsed_time": 279,
//             "elevation_difference": 18.4,
//             "moving_time": 279,
//             "split": 14,
//             "average_speed": 3.59,
//             "average_grade_adjusted_speed": 3.94,
//             "average_heartrate": 171.05017921146953,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1001.6,
//             "elapsed_time": 288,
//             "elevation_difference": 0.2,
//             "moving_time": 288,
//             "split": 15,
//             "average_speed": 3.48,
//             "average_grade_adjusted_speed": 3.56,
//             "average_heartrate": 169.9375,
//             "pace_zone": 2
//         },
//         {
//             "distance": 997.6,
//             "elapsed_time": 283,
//             "elevation_difference": 0.4,
//             "moving_time": 283,
//             "split": 16,
//             "average_speed": 3.53,
//             "average_grade_adjusted_speed": 3.53,
//             "average_heartrate": 173.51590106007066,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1015.1,
//             "elapsed_time": 294,
//             "elevation_difference": -2,
//             "moving_time": 294,
//             "split": 17,
//             "average_speed": 3.45,
//             "average_grade_adjusted_speed": 3.44,
//             "average_heartrate": 173.6156462585034,
//             "pace_zone": 2
//         },
//         {
//             "distance": 995.4,
//             "elapsed_time": 279,
//             "elevation_difference": -0.2,
//             "moving_time": 279,
//             "split": 18,
//             "average_speed": 3.57,
//             "average_grade_adjusted_speed": 3.57,
//             "average_heartrate": 173.03237410071944,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1001.3,
//             "elapsed_time": 279,
//             "elevation_difference": -1.6,
//             "moving_time": 279,
//             "split": 19,
//             "average_speed": 3.59,
//             "average_grade_adjusted_speed": 3.59,
//             "average_heartrate": 174.9892086330935,
//             "pace_zone": 2
//         },
//         {
//             "distance": 988.7,
//             "elapsed_time": 277,
//             "elevation_difference": -0.6,
//             "moving_time": 277,
//             "split": 20,
//             "average_speed": 3.57,
//             "average_grade_adjusted_speed": 3.57,
//             "average_heartrate": 173.79061371841155,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1003.9,
//             "elapsed_time": 288,
//             "elevation_difference": 2.8,
//             "moving_time": 288,
//             "split": 21,
//             "average_speed": 3.49,
//             "average_grade_adjusted_speed": 3.52,
//             "average_heartrate": 175.34843205574913,
//             "pace_zone": 2
//         },
//         {
//             "distance": 364.3,
//             "elapsed_time": 98,
//             "elevation_difference": 1,
//             "moving_time": 98,
//             "split": 22,
//             "average_speed": 3.72,
//             "average_grade_adjusted_speed": 3.75,
//             "average_heartrate": 177.53061224489795,
//             "pace_zone": 3
//         }
//     ],
//     "splits_standard": [
//         {
//             "distance": 1624.1,
//             "elapsed_time": 486,
//             "elevation_difference": -7.6,
//             "moving_time": 486,
//             "split": 1,
//             "average_speed": 3.34,
//             "average_grade_adjusted_speed": 3.31,
//             "average_heartrate": 160.80041152263374,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1600.3,
//             "elapsed_time": 469,
//             "elevation_difference": 13,
//             "moving_time": 469,
//             "split": 2,
//             "average_speed": 3.41,
//             "average_grade_adjusted_speed": 4.06,
//             "average_heartrate": 169.50321199143468,
//             "pace_zone": 4
//         },
//         {
//             "distance": 1609.3,
//             "elapsed_time": 459,
//             "elevation_difference": 4.2,
//             "moving_time": 459,
//             "split": 3,
//             "average_speed": 3.51,
//             "average_grade_adjusted_speed": 3.81,
//             "average_heartrate": 164.4814814814815,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1618.6,
//             "elapsed_time": 471,
//             "elevation_difference": 1,
//             "moving_time": 471,
//             "split": 4,
//             "average_speed": 3.44,
//             "average_grade_adjusted_speed": 4.99,
//             "average_heartrate": 162.72921108742005,
//             "pace_zone": 6
//         },
//         {
//             "distance": 1601.2,
//             "elapsed_time": 456,
//             "elevation_difference": -17.4,
//             "moving_time": 456,
//             "split": 5,
//             "average_speed": 3.51,
//             "average_grade_adjusted_speed": 5.19,
//             "average_heartrate": 163.79470198675497,
//             "pace_zone": 6
//         },
//         {
//             "distance": 1604.3,
//             "elapsed_time": 453,
//             "elevation_difference": 9.2,
//             "moving_time": 453,
//             "split": 6,
//             "average_speed": 3.54,
//             "average_grade_adjusted_speed": 4.51,
//             "average_heartrate": 165.77704194260485,
//             "pace_zone": 5
//         },
//         {
//             "distance": 1614.1,
//             "elapsed_time": 466,
//             "elevation_difference": -2.4,
//             "moving_time": 466,
//             "split": 7,
//             "average_speed": 3.46,
//             "average_grade_adjusted_speed": 3.83,
//             "average_heartrate": 166.77467811158797,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1606.9,
//             "elapsed_time": 452,
//             "elevation_difference": -18.6,
//             "moving_time": 452,
//             "split": 8,
//             "average_speed": 3.56,
//             "average_grade_adjusted_speed": 3.74,
//             "average_heartrate": 169.46681415929203,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1605.6,
//             "elapsed_time": 459,
//             "elevation_difference": 15,
//             "moving_time": 459,
//             "split": 9,
//             "average_speed": 3.5,
//             "average_grade_adjusted_speed": 3.75,
//             "average_heartrate": 171.16339869281046,
//             "pace_zone": 3
//         },
//         {
//             "distance": 1629.6,
//             "elapsed_time": 461,
//             "elevation_difference": 0.2,
//             "moving_time": 461,
//             "split": 10,
//             "average_speed": 3.53,
//             "average_grade_adjusted_speed": 3.54,
//             "average_heartrate": 172.175704989154,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1603.1,
//             "elapsed_time": 459,
//             "elevation_difference": -1.8,
//             "moving_time": 459,
//             "split": 11,
//             "average_speed": 3.49,
//             "average_grade_adjusted_speed": 3.49,
//             "average_heartrate": 172.71615720524017,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1596.7,
//             "elapsed_time": 445,
//             "elevation_difference": -1.6,
//             "moving_time": 445,
//             "split": 12,
//             "average_speed": 3.59,
//             "average_grade_adjusted_speed": 3.59,
//             "average_heartrate": 174.50900900900902,
//             "pace_zone": 2
//         },
//         {
//             "distance": 1608.7,
//             "elapsed_time": 458,
//             "elevation_difference": 2.2,
//             "moving_time": 458,
//             "split": 13,
//             "average_speed": 3.51,
//             "average_grade_adjusted_speed": 3.53,
//             "average_heartrate": 174.84245076586433,
//             "pace_zone": 2
//         },
//         {
//             "distance": 447.3,
//             "elapsed_time": 121,
//             "elevation_difference": 0.6,
//             "moving_time": 121,
//             "split": 14,
//             "average_speed": 3.7,
//             "average_grade_adjusted_speed": 3.72,
//             "average_heartrate": 177.2396694214876,
//             "pace_zone": 3
//         }
//     ],
//     "laps": [
//         {
//             "id": 27016667168,
//             "resource_state": 2,
//             "name": "Lap 1",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 310,
//             "moving_time": 310,
//             "start_date": "2022-11-06T09:05:52Z",
//             "start_date_local": "2022-11-06T09:05:52Z",
//             "distance": 1000,
//             "start_index": 0,
//             "end_index": 83,
//             "total_elevation_gain": 2,
//             "average_speed": 3.23,
//             "max_speed": 3.803,
//             "average_cadence": 84.2,
//             "device_watts": false,
//             "average_heartrate": 155.8,
//             "max_heartrate": 169,
//             "lap_index": 1,
//             "split": 1,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667177,
//             "resource_state": 2,
//             "name": "Lap 2",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 288,
//             "moving_time": 288,
//             "start_date": "2022-11-06T09:11:06Z",
//             "start_date_local": "2022-11-06T09:11:06Z",
//             "distance": 1000,
//             "start_index": 84,
//             "end_index": 181,
//             "total_elevation_gain": 31,
//             "average_speed": 3.47,
//             "max_speed": 4.017,
//             "average_cadence": 84.9,
//             "device_watts": false,
//             "average_heartrate": 170,
//             "max_heartrate": 174,
//             "lap_index": 2,
//             "split": 2,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667183,
//             "resource_state": 2,
//             "name": "Lap 3",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 289,
//             "moving_time": 289,
//             "start_date": "2022-11-06T09:15:57Z",
//             "start_date_local": "2022-11-06T09:15:57Z",
//             "distance": 1000,
//             "start_index": 182,
//             "end_index": 295,
//             "total_elevation_gain": 39.8,
//             "average_speed": 3.46,
//             "max_speed": 4.58,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 169.4,
//             "max_heartrate": 173,
//             "lap_index": 3,
//             "split": 3,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667188,
//             "resource_state": 2,
//             "name": "Lap 4",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 288,
//             "moving_time": 288,
//             "start_date": "2022-11-06T09:20:42Z",
//             "start_date_local": "2022-11-06T09:20:42Z",
//             "distance": 1000,
//             "start_index": 296,
//             "end_index": 398,
//             "total_elevation_gain": 28.2,
//             "average_speed": 3.47,
//             "max_speed": 4.688,
//             "average_cadence": 84.4,
//             "device_watts": false,
//             "average_heartrate": 166.3,
//             "max_heartrate": 171,
//             "lap_index": 4,
//             "split": 4,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667195,
//             "resource_state": 2,
//             "name": "Lap 5",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 210,
//             "moving_time": 210,
//             "start_date": "2022-11-06T09:25:33Z",
//             "start_date_local": "2022-11-06T09:25:33Z",
//             "distance": 736.35,
//             "start_index": 399,
//             "end_index": 476,
//             "total_elevation_gain": 18.6,
//             "average_speed": 3.51,
//             "max_speed": 4.615,
//             "average_cadence": 85.1,
//             "device_watts": false,
//             "average_heartrate": 163.6,
//             "max_heartrate": 167,
//             "lap_index": 5,
//             "split": 5,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667201,
//             "resource_state": 2,
//             "name": "Lap 6",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 293,
//             "moving_time": 293,
//             "start_date": "2022-11-06T09:29:03Z",
//             "start_date_local": "2022-11-06T09:29:03Z",
//             "distance": 1000,
//             "start_index": 477,
//             "end_index": 631,
//             "total_elevation_gain": 89.8,
//             "average_speed": 3.41,
//             "max_speed": 4.627,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 161.5,
//             "max_heartrate": 164,
//             "lap_index": 6,
//             "split": 6,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667210,
//             "resource_state": 2,
//             "name": "Lap 7",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 284,
//             "moving_time": 284,
//             "start_date": "2022-11-06T09:33:54Z",
//             "start_date_local": "2022-11-06T09:33:54Z",
//             "distance": 1000,
//             "start_index": 632,
//             "end_index": 799,
//             "total_elevation_gain": 82.4,
//             "average_speed": 3.52,
//             "max_speed": 5.182,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 163.8,
//             "max_heartrate": 169,
//             "lap_index": 7,
//             "split": 7,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667215,
//             "resource_state": 2,
//             "name": "Lap 8",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 285,
//             "moving_time": 285,
//             "start_date": "2022-11-06T09:38:39Z",
//             "start_date_local": "2022-11-06T09:38:39Z",
//             "distance": 1000,
//             "start_index": 800,
//             "end_index": 950,
//             "total_elevation_gain": 91.2,
//             "average_speed": 3.51,
//             "max_speed": 4.88,
//             "average_cadence": 84.9,
//             "device_watts": false,
//             "average_heartrate": 164.1,
//             "max_heartrate": 168,
//             "lap_index": 8,
//             "split": 8,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667220,
//             "resource_state": 2,
//             "name": "Lap 9",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 283,
//             "moving_time": 283,
//             "start_date": "2022-11-06T09:43:25Z",
//             "start_date_local": "2022-11-06T09:43:25Z",
//             "distance": 1000,
//             "start_index": 951,
//             "end_index": 1096,
//             "total_elevation_gain": 84.8,
//             "average_speed": 3.53,
//             "max_speed": 4.828,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 165.5,
//             "max_heartrate": 169,
//             "lap_index": 9,
//             "split": 9,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667222,
//             "resource_state": 2,
//             "name": "Lap 10",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 282,
//             "moving_time": 282,
//             "start_date": "2022-11-06T09:48:08Z",
//             "start_date_local": "2022-11-06T09:48:08Z",
//             "distance": 1000,
//             "start_index": 1097,
//             "end_index": 1196,
//             "total_elevation_gain": 45.6,
//             "average_speed": 3.55,
//             "max_speed": 3.96,
//             "average_cadence": 84.9,
//             "device_watts": false,
//             "average_heartrate": 165.6,
//             "max_heartrate": 168,
//             "lap_index": 10,
//             "split": 10,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667226,
//             "resource_state": 2,
//             "name": "Lap 11",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 284,
//             "moving_time": 284,
//             "start_date": "2022-11-06T09:52:53Z",
//             "start_date_local": "2022-11-06T09:52:53Z",
//             "distance": 1000,
//             "start_index": 1197,
//             "end_index": 1289,
//             "total_elevation_gain": 32.8,
//             "average_speed": 3.52,
//             "max_speed": 4.057,
//             "average_cadence": 85.3,
//             "device_watts": false,
//             "average_heartrate": 165.5,
//             "max_heartrate": 169,
//             "lap_index": 11,
//             "split": 11,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667229,
//             "resource_state": 2,
//             "name": "Lap 12",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 292,
//             "moving_time": 292,
//             "start_date": "2022-11-06T09:57:36Z",
//             "start_date_local": "2022-11-06T09:57:36Z",
//             "distance": 1000,
//             "start_index": 1290,
//             "end_index": 1401,
//             "total_elevation_gain": 42.8,
//             "average_speed": 3.42,
//             "max_speed": 4.404,
//             "average_cadence": 84.7,
//             "device_watts": false,
//             "average_heartrate": 168.6,
//             "max_heartrate": 176,
//             "lap_index": 12,
//             "split": 12,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667231,
//             "resource_state": 2,
//             "name": "Lap 13",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 281,
//             "moving_time": 281,
//             "start_date": "2022-11-06T10:02:28Z",
//             "start_date_local": "2022-11-06T10:02:28Z",
//             "distance": 1000,
//             "start_index": 1402,
//             "end_index": 1505,
//             "total_elevation_gain": 14.6,
//             "average_speed": 3.56,
//             "max_speed": 4.72,
//             "average_cadence": 85.6,
//             "device_watts": false,
//             "average_heartrate": 169.9,
//             "max_heartrate": 176,
//             "lap_index": 13,
//             "split": 13,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667235,
//             "resource_state": 2,
//             "name": "Lap 14",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 283,
//             "moving_time": 283,
//             "start_date": "2022-11-06T10:07:09Z",
//             "start_date_local": "2022-11-06T10:07:09Z",
//             "distance": 1000,
//             "start_index": 1506,
//             "end_index": 1611,
//             "total_elevation_gain": 32.4,
//             "average_speed": 3.53,
//             "max_speed": 4.859,
//             "average_cadence": 85.6,
//             "device_watts": false,
//             "average_heartrate": 171.3,
//             "max_heartrate": 178,
//             "lap_index": 14,
//             "split": 14,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667239,
//             "resource_state": 2,
//             "name": "Lap 15",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 261,
//             "moving_time": 261,
//             "start_date": "2022-11-06T10:11:52Z",
//             "start_date_local": "2022-11-06T10:11:52Z",
//             "distance": 920.25,
//             "start_index": 1612,
//             "end_index": 1693,
//             "total_elevation_gain": 14,
//             "average_speed": 3.53,
//             "max_speed": 4.668,
//             "average_cadence": 85.7,
//             "device_watts": false,
//             "average_heartrate": 170.5,
//             "max_heartrate": 174,
//             "lap_index": 15,
//             "split": 15,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667243,
//             "resource_state": 2,
//             "name": "Lap 16",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 280,
//             "moving_time": 280,
//             "start_date": "2022-11-06T10:16:15Z",
//             "start_date_local": "2022-11-06T10:16:15Z",
//             "distance": 1000,
//             "start_index": 1694,
//             "end_index": 1762,
//             "total_elevation_gain": 2.4,
//             "average_speed": 3.57,
//             "max_speed": 4.447,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 171.1,
//             "max_heartrate": 179,
//             "lap_index": 16,
//             "split": 16,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667246,
//             "resource_state": 2,
//             "name": "Lap 17",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 289,
//             "moving_time": 289,
//             "start_date": "2022-11-06T10:20:56Z",
//             "start_date_local": "2022-11-06T10:20:56Z",
//             "distance": 1000,
//             "start_index": 1763,
//             "end_index": 1835,
//             "total_elevation_gain": 0,
//             "average_speed": 3.46,
//             "max_speed": 4.132,
//             "average_cadence": 84.8,
//             "device_watts": false,
//             "average_heartrate": 175.8,
//             "max_heartrate": 181,
//             "lap_index": 17,
//             "split": 17,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667250,
//             "resource_state": 2,
//             "name": "Lap 18",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 283,
//             "moving_time": 283,
//             "start_date": "2022-11-06T10:25:48Z",
//             "start_date_local": "2022-11-06T10:25:48Z",
//             "distance": 1000,
//             "start_index": 1836,
//             "end_index": 1911,
//             "total_elevation_gain": 0,
//             "average_speed": 3.53,
//             "max_speed": 4.242,
//             "average_cadence": 85.7,
//             "device_watts": false,
//             "average_heartrate": 171.1,
//             "max_heartrate": 179,
//             "lap_index": 18,
//             "split": 18,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667257,
//             "resource_state": 2,
//             "name": "Lap 19",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 277,
//             "moving_time": 277,
//             "start_date": "2022-11-06T10:30:28Z",
//             "start_date_local": "2022-11-06T10:30:28Z",
//             "distance": 1000,
//             "start_index": 1912,
//             "end_index": 1981,
//             "total_elevation_gain": 0,
//             "average_speed": 3.61,
//             "max_speed": 4.581,
//             "average_cadence": 85.9,
//             "device_watts": false,
//             "average_heartrate": 175.1,
//             "max_heartrate": 180,
//             "lap_index": 19,
//             "split": 19,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667262,
//             "resource_state": 2,
//             "name": "Lap 20",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 278,
//             "moving_time": 278,
//             "start_date": "2022-11-06T10:35:08Z",
//             "start_date_local": "2022-11-06T10:35:08Z",
//             "distance": 1000,
//             "start_index": 1982,
//             "end_index": 2056,
//             "total_elevation_gain": 0,
//             "average_speed": 3.6,
//             "max_speed": 4.472,
//             "average_cadence": 85,
//             "device_watts": false,
//             "average_heartrate": 173.5,
//             "max_heartrate": 176,
//             "lap_index": 20,
//             "split": 20,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667267,
//             "resource_state": 2,
//             "name": "Lap 21",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 289,
//             "moving_time": 289,
//             "start_date": "2022-11-06T10:39:46Z",
//             "start_date_local": "2022-11-06T10:39:46Z",
//             "distance": 1000,
//             "start_index": 2057,
//             "end_index": 2122,
//             "total_elevation_gain": 3.2,
//             "average_speed": 3.46,
//             "max_speed": 3.818,
//             "average_cadence": 85.2,
//             "device_watts": false,
//             "average_heartrate": 175,
//             "max_heartrate": 179,
//             "lap_index": 21,
//             "split": 21,
//             "pace_zone": 2
//         },
//         {
//             "id": 27016667274,
//             "resource_state": 2,
//             "name": "Lap 22",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 193,
//             "moving_time": 193,
//             "start_date": "2022-11-06T10:44:39Z",
//             "start_date_local": "2022-11-06T10:44:39Z",
//             "distance": 713.25,
//             "start_index": 2123,
//             "end_index": 2173,
//             "total_elevation_gain": 2.6,
//             "average_speed": 3.7,
//             "max_speed": 4.938,
//             "average_cadence": 85.7,
//             "device_watts": false,
//             "average_heartrate": 176.6,
//             "max_heartrate": 184,
//             "lap_index": 22,
//             "split": 22,
//             "pace_zone": 3
//         }
//     ],
//     "best_efforts": [
//         {
//             "id": 22616284155,
//             "resource_state": 2,
//             "name": "400m",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 105,
//             "moving_time": 106,
//             "start_date": "2022-11-06T10:04:29Z",
//             "start_date_local": "2022-11-06T10:04:29Z",
//             "distance": 400,
//             "start_index": 1442,
//             "end_index": 1480,
//             "pr_rank": null,
//             "achievements": []
//         },
//         {
//             "id": 22616284168,
//             "resource_state": 2,
//             "name": "1/2 mile",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 216,
//             "moving_time": 217,
//             "start_date": "2022-11-06T10:43:58Z",
//             "start_date_local": "2022-11-06T10:43:58Z",
//             "distance": 805,
//             "start_index": 2114,
//             "end_index": 2169,
//             "pr_rank": null,
//             "achievements": []
//         },
//         {
//             "id": 22616284178,
//             "resource_state": 2,
//             "name": "1k",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 270,
//             "moving_time": 272,
//             "start_date": "2022-11-06T10:42:56Z",
//             "start_date_local": "2022-11-06T10:42:56Z",
//             "distance": 1000,
//             "start_index": 2102,
//             "end_index": 2167,
//             "pr_rank": null,
//             "achievements": []
//         },
//         {
//             "id": 22616284193,
//             "resource_state": 2,
//             "name": "1 mile",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 446,
//             "moving_time": 447,
//             "start_date": "2022-11-06T10:26:56Z",
//             "start_date_local": "2022-11-06T10:26:56Z",
//             "distance": 1609,
//             "start_index": 1852,
//             "end_index": 1971,
//             "pr_rank": null,
//             "achievements": []
//         },
//         {
//             "id": 22616284212,
//             "resource_state": 2,
//             "name": "2 mile",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 899,
//             "moving_time": 900,
//             "start_date": "2022-11-06T10:32:30Z",
//             "start_date_local": "2022-11-06T10:32:30Z",
//             "distance": 3219,
//             "start_index": 1943,
//             "end_index": 2168,
//             "pr_rank": null,
//             "achievements": []
//         },
//         {
//             "id": 22616284232,
//             "resource_state": 2,
//             "name": "5k",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 1404,
//             "moving_time": 1405,
//             "start_date": "2022-11-06T10:24:03Z",
//             "start_date_local": "2022-11-06T10:24:03Z",
//             "distance": 5000,
//             "start_index": 1807,
//             "end_index": 2167,
//             "pr_rank": 2,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 2
//                 }
//             ]
//         },
//         {
//             "id": 22616284249,
//             "resource_state": 2,
//             "name": "10k",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 2825,
//             "moving_time": 2826,
//             "start_date": "2022-11-06T10:00:24Z",
//             "start_date_local": "2022-11-06T10:00:24Z",
//             "distance": 10000,
//             "start_index": 1358,
//             "end_index": 2168,
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ]
//         },
//         {
//             "id": 22616284285,
//             "resource_state": 2,
//             "name": "15k",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 4249,
//             "moving_time": 4250,
//             "start_date": "2022-11-06T09:36:38Z",
//             "start_date_local": "2022-11-06T09:36:38Z",
//             "distance": 15000,
//             "start_index": 726,
//             "end_index": 2167,
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ]
//         },
//         {
//             "id": 22616284311,
//             "resource_state": 2,
//             "name": "10 mile",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 4566,
//             "moving_time": 4567,
//             "start_date": "2022-11-06T09:31:35Z",
//             "start_date_local": "2022-11-06T09:31:35Z",
//             "distance": 16090,
//             "start_index": 545,
//             "end_index": 2172,
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ]
//         },
//         {
//             "id": 22616284334,
//             "resource_state": 2,
//             "name": "20k",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 5696,
//             "moving_time": 5697,
//             "start_date": "2022-11-06T09:12:33Z",
//             "start_date_local": "2022-11-06T09:12:33Z",
//             "distance": 20000,
//             "start_index": 108,
//             "end_index": 2168,
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ]
//         },
//         {
//             "id": 22616284356,
//             "resource_state": 2,
//             "name": "Half-Marathon",
//             "activity": {
//                 "id": 8076222179,
//                 "resource_state": 1
//             },
//             "athlete": {
//                 "id": 14708264,
//                 "resource_state": 1
//             },
//             "elapsed_time": 6021,
//             "moving_time": 6023,
//             "start_date": "2022-11-06T09:07:18Z",
//             "start_date_local": "2022-11-06T09:07:18Z",
//             "distance": 21097,
//             "start_index": 27,
//             "end_index": 2171,
//             "pr_rank": 1,
//             "achievements": [
//                 {
//                     "type_id": 3,
//                     "type": "pr",
//                     "rank": 1
//                 }
//             ]
//         }
//     ],
//     "gear": {
//         "id": "g11780356",
//         "primary": false,
//         "name": "Saucony Endorphin Pro 3 Saucony racers",
//         "nickname": "Saucony racers",
//         "resource_state": 2,
//         "retired": false,
//         "distance": 67812,
//         "converted_distance": 67.8
//     },
//     "photos": {
//         "primary": null,
//         "count": 0
//     },
//     "stats_visibility": [
//         {
//             "type": "heart_rate",
//             "visibility": "everyone"
//         },
//         {
//             "type": "pace",
//             "visibility": "everyone"
//         },
//         {
//             "type": "power",
//             "visibility": "everyone"
//         },
//         {
//             "type": "speed",
//             "visibility": "everyone"
//         },
//         {
//             "type": "calories",
//             "visibility": "everyone"
//         }
//     ],
//     "hide_from_home": false,
//     "device_name": "Garmin vívoactive 4S",
//     "embed_token": "c01784e9e6d2b7606175f5bea86b9848f3baf297",
//     "similar_activities": {
//         "effort_count": 1,
//         "average_speed": 3.4946606066026167,
//         "min_average_speed": 3.4946606066026167,
//         "mid_average_speed": 3.4946606066026167,
//         "max_average_speed": 3.4946606066026167,
//         "pr_rank": null,
//         "frequency_milestone": null,
//         "trend": {
//             "speeds": [
//                 3.4946606066026167
//             ],
//             "current_activity_index": 0,
//             "min_speed": 3.4946606066026167,
//             "mid_speed": 3.4946606066026167,
//             "max_speed": 3.4946606066026167,
//             "direction": 0
//         },
//         "resource_state": 2
//     },
//     "available_zones": [
//         "heartrate",
//         "pace"
//     ]
// } 


// Event listeners 

form.addEventListener('submit', handleSubmit);

window.addEventListener('load', () => {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
   
    if(code != null) {
        const runID = localStorage.getItem('actID');
        activityInput.value = runID;
        displayLoading();
        fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => displayData(result.access_token, runID));
    }
});

unitRadios.forEach(unit => {
    unit.addEventListener('change', updateSplits)
})

function displayData(accessToken, ID) {
    console.log(accessToken, ID);
        fetch(`https://www.strava.com/api/v3/activities/${ID}?access_token=${accessToken}`)
    .then(response => response.json())
    .then(result => {
        hideLoading();
        setActivities(result);
    })
}


// Add goals

const handleGoalAdd = () => {
    const html = ` 
    <div class="input-group mb-3 goal">
        <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox">
        <span class="goal-delete">x</span>
  </div>
  `

  document.querySelector('.card--goals').insertAdjacentHTML('beforeend', html);
}

addGoalBtn.addEventListener('click', handleGoalAdd);

// Delete goals

const deleteGoal = (e) => {
    if(e.target.classList.contains('goal-delete')) {
        e.target.parentElement.remove();
    }
}

goalCard.addEventListener('click', deleteGoal);

// Loading 

function displayLoading() {
    loading.classList.remove('d-none');
    loading.classList.add('d-block');
}

function hideLoading() {
    loading.classList.remove('d-block');
    loading.classList.add('d-none');
}

// Display activities

function setActivities(race) {

    // Set global race (this poor logic will be fixed)
    globalRace = race;


    if(race.laps.length > race.splits_standard.length) {
        metricOrStandard = 'km';
    } else {
        metricOrStandard = 'miles'
    }

    setSplitsMetric(metricOrStandard);

    function setSplitsMetric() {
        document.querySelector(`.radio-${metricOrStandard}`).checked = true;
    }
    


    // Get data
    // let shoes = race.gear.name;
    let raceName = race.name;
    let totalTime = new Date(race.elapsed_time * 1000).toISOString().slice(11,19);
    let splits = race.laps;

    results.classList.remove('d-none');
    results.classList.add('d-flex');

    const convertToMin = (s) => {
       // 👇️ get number of full minutes
       const minutes = Math.floor(s / 60);
        
       // 👇️ get remainder of seconds
       const seconds = s % 60;
       
       function padTo2Digits(num) {
         return num.toString().padStart(2, '0');
       }
       
       // ✅ format as MM:SS
       const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
       return result;
    }

    function convertTime(time) {
        const timestamp = new Date(time);
        const month = timestamp.toLocaleString('default', {month: 'long'});
        const day = timestamp.toLocaleString('default', {weekday: 'long'});
        const date = timestamp.getDate();
        const year = timestamp.getUTCFullYear();
        return `${day} ${month} ${date}, ${year}`;
    }

    function displaySplits(lap) {

        document.querySelector('.the-splits').insertAdjacentHTML('beforeEnd',
            `
            <div class="mb-3">
                <label for="race-${lap.name}-control" class="form-label">
                    Split ${lap.name}
                </label>
                <input type="text" class="form-control" id="race-distance-control" value=${convertToMin(lap.elapsed_time)}>
            </div>
            `
        )
    }

    function displayMetric(metric, item) {
        if(metric !== undefined){
            document.querySelector(`#race-${item}-control`).value = metric;
        }
    }

    displayMetric(raceName, 'name');
    displayMetric(totalTime, 'time');
    displayMetric(race.total_elevation_gain, 'elevation');
    document.querySelector('#race-date-control').value = convertTime(race.start_date);
    document.querySelector('#race-distance-control').value = `${(race.distance / 1000).toFixed(2)} km`;
    displayMetric(race.location_city, 'location');
    document.querySelector('#race-time-control').value = totalTime;
    document.querySelector('#race-location-control').value = race.location_city;

    // Display splits in chosen metric
    race.laps.forEach(lap => displaySplits(lap))
 

}


// Handle submit

function handleSubmit(event) {
    event.preventDefault();

    const activityID = (form.elements[0].value);
    localStorage.setItem('actID', activityID);
    const url = `https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=http://127.0.0.1:5500/&approval_prompt=force&scope=activity:read_all`;
    window.location = url;
    // displayLoading();

    // let urlSplit = event.target.elements[0].value.split("/");
    // let activityId = urlSplit[urlSplit.length -1];
    // console.log(activityId);

    // fetch(`https://www.strava.com/api/v3/activities/${activityId}?access_token=${accessToken}`)
    // .then(response => response.json())
    // .then(result => {
    //     hideLoading();
    //     setActivities(result);
    // })

}


// Update splits 
function updateSplits(event) {

    const convertToMin = (s) => {

        // 👇️ get number of full minutes
        const minutes = Math.floor(s / 60);
        
        // 👇️ get remainder of seconds
        const seconds = s % 60;
        
        function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
        }
        
        // ✅ format as MM:SS
        const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
        return result;
    }
    
    const displaySplits = (lap) => {

        document.querySelector('.the-splits').insertAdjacentHTML('beforeEnd',
            `
            <div class="mb-3">
                <label for="race-${lap.split}-control" class="form-label">
                    Split ${lap.split}
                </label>
                <input type="text" class="form-control" id="race-distance-control" value=${convertToMin(lap.elapsed_time)}>
            </div>
            `
        )
    }
    
    let newSplits;


    if(event.target.value === 'km') {
        newSplits = globalRace.splits_metric;
    } else if (event.target.value = 'miles') {
        newSplits = globalRace.splits_standard;
    }


    document.querySelector('.the-splits').innerHTML = '';

    newSplits.forEach(lap => displaySplits(lap))


}

