// WARNING: this file is auto generated, any changes will be lost
import { createDesignComponent, CanvasStore } from "framer"
const canvas = CanvasStore.shared(); // CANVAS_DATA;

export const colors = Object.freeze({
    /** #0071B3 */
    "Blue": "var(--token-00504a91-a55a-4ed0-a6fa-f11d9658c41b, rgb(0, 113, 179))",
    /** #F7A100 */
    "Orange": "var(--token-56f128fd-d25e-48e7-a276-4f898e896c8b, rgb(247, 161, 0))",
    /** #ACC700 */
    "BrightGreen": "var(--token-f5ddc8b6-5776-47f5-a0ca-feba2c3ab0e3, rgb(172, 199, 0))",
    /** #53241B */
    "Brown": "var(--token-6a959b78-b55c-42d3-ae25-2b3b22d097e2, rgb(83, 36, 27))",
    /** #60C5F8 */
    "BrightBlue": "var(--token-977a6787-60c9-4cbe-91de-ab3d4df015f9, rgb(96, 197, 248))",
    /** #F8C463 */
    "OrangeLighter": "var(--token-83e4c252-2182-44e0-9076-00b5df6ed90f, rgb(248, 196, 99))",
    /** #F8B73E */
    "OrangeLight": "var(--token-da835df4-8d5e-45d0-8f4a-1bd58754f57d, rgb(248, 183, 62))",
    /** #DE9000 */
    "OrangeDarker": "var(--token-347b09ff-e9e1-4ee5-af28-da9f4bd559c0, rgb(222, 144, 0))",
    /** #478BB3 */
    "BlueLighter": "var(--token-36571bb0-d5e6-4744-8992-a0b9f62e0f7d, rgb(71, 139, 179))",
    /** #2C81B3 */
    "BlueLight": "var(--token-562320d2-6a29-4400-b8ce-415df128c501, rgb(44, 129, 179))",
    /** #006199 */
    "BlueDarker": "var(--token-8e332bfb-2b90-4838-93d4-2861e250a91f, rgb(0, 97, 153))",
    /** #F7F7F7 */
    "GreyLightest": "var(--token-3cb4b7f8-1335-46a1-ac5b-c152a7ef6508, rgb(247, 247, 247))",
    /** #EDEDED */
    "GreyLighter": "var(--token-ffe23df7-2908-47dc-9fc0-0ed74afd87a7, rgb(237, 237, 237))",
    /** #CCCCCC */
    "GreyLight": "var(--token-69fdf0c3-937f-4065-a671-1af27c1ec67e, rgb(204, 204, 204))",
    /** #999999 */
    "Grey": "var(--token-30a4e35d-10cd-4799-a653-2e797055e25c, rgb(153, 153, 153))",
    /** #666666 */
    "GreyDark": "var(--token-8c46c95f-c1e3-43b3-9864-e3863c5f4e1b, rgb(102, 102, 102))",
    /** #333333 */
    "GreyDarker": "var(--token-9b5196a3-e8ec-46c8-b65a-2a15bf1e551c, rgb(51, 51, 51))",
    /** #E6F2F7 */
    "NaturalBlue": "var(--token-e3e395ee-4217-4d80-861d-60511981cec8, rgb(230, 242, 247))",
    /** #FFFFFF */
    "White": "var(--token-0145e38c-44f5-406a-90d9-e978a6823f6e, rgb(255, 255, 255))",
    /** #7F0051 */
    "Visited": "var(--token-691b9673-d2ff-4f6d-8eff-1d08e7395333, rgb(127, 0, 81))",
    /** #00517F */
    "Hover": "var(--token-ac69acd4-2b06-4f83-8f05-6361282b6b42, rgb(0, 81, 127))",
    /** #FCF7EC */
    "VGMNLLight": "var(--token-75b4e445-4350-4bb8-a6b4-24d6b6b72ae4, rgb(252, 247, 236))",
    /** #EEB045 */
    "VGMNL": "var(--token-c4b602db-9f44-49ff-b6bf-3fd8eeeb981c, rgb(238, 176, 69))",
    /** #FBF3EA */
    "VastGoedProLight": "var(--token-31d8448e-cb63-40db-900d-6b73088bc8c1, rgb(251, 243, 234))",
    /** #E69130 */
    "VastgoedPro": "var(--token-20427938-287b-466d-bda1-e8aff1d4537b, rgb(230, 145, 48))",
    /** #EEEFF5 */
    "VBOLight": "var(--token-88bc318e-30cf-4c5b-9677-7e6b437f393b, rgb(238, 239, 245))",
    /** #5B62A1 */
    "VBO": "var(--token-b5379f1e-42f2-41d3-91d3-1f1c5e4bc772, rgb(91, 98, 161))",
    /** #ECF1F7 */
    "NVMLight": "var(--token-7eed7306-0dc8-4a95-8e58-51e51622059e, rgb(236, 241, 247))",
    /** #3C7CB3 */
    "NVM": "var(--token-c3ee546f-01df-4dc4-8f4c-d143967c931d, rgb(60, 124, 179))",
    /** #BA3486 */
    "NVMOpenHuis": "var(--token-20a00ae7-9d9c-44c7-a1cb-08836a6a5cd7, rgb(186, 52, 134))",
    /** #F86700 */
    "Veiling": "var(--token-8ee27c1e-7ed3-473a-8816-75339a09f884, rgb(248, 103, 0))",
    /** #FDFAE5 */
    "YellowLight": "var(--token-07677ea7-0049-4321-953b-3a640ff6f575, rgb(253, 250, 229))",
    /** #FBEBEA */
    "RedLight": "var(--token-be29b890-893b-4cd9-b85b-3b2b3212570c, rgb(251, 235, 234))",
    /** #EAF7EB */
    "GreenLight": "var(--token-4e4c8cc4-9c75-41a1-b2e9-64908054b3cd, rgb(234, 247, 235))",
    /** #F8CE00 */
    "Yellow": "var(--token-617e9562-0969-422e-b6a2-3c1c0cce6076, rgb(248, 206, 0))",
    /** #F03C30 */
    "Red": "var(--token-c88943b3-4708-4743-8fd0-4ce0b5969ea2, rgb(240, 60, 48))",
    /** #22AB34 */
    "Green": "var(--token-def97354-aef8-4eb3-880f-6f7ba77c3041, rgb(34, 171, 52))",
})
