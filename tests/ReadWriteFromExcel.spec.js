// const { test } = require('@playwright/test')

// const ExcelJS = require('exceljs')


//  async function ExcelTest() {

//     const workbook1 = new ExcelJS.Workbook();
//     await workbook1.xlsx.readFile("D:\PlayWrightAutomation\tests\TestData.xlsx");
//     const worksheet = workbook1.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             if(cell.value === 'Apple') {
//                 console.log(rowNumber);
//                 console.log(colNumber);
//             }
//         })

//     })

//     const cell =worksheet.getCell(3,2);
//     cell.value = "IPhone";
//     await workbook1.xlsx.writeFile("D:\PlayWrightAutomation\tests\TestData.xlsx");
   
         
// }
// ExcelTest();