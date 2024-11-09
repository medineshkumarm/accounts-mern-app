const xlsx = require("xlsx");
const path = require("path");

/**
 * Basic js function to convert from Excel to JSON and vice versa
 */
function excelToJSON(excelFilePath) {
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return {
    data: jsonData,
    message: "excel to JSON data conversion was sucess!",
  };
}

function JSONtoExcel(JSONpath, sheetName, fileName) {
  // const xlsx = require("xlsx");
  const ws = xlsx.utils.json_to_sheet(JSONpath);
  const wb = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(wb, ws, sheetName);
  xlsx.writeFile(wb, `${fileName}.xlsx`);
  return "json to excel was a success!!!";
}
// const output = JSONtoExcel(json, "sheet0", "report");
// console.log(output);
// const excelPath = path.resolve(__dirname, "report.xlsx");
// excelToJSON(excelPath).then((json) => {
//   console.log("Excel to JSON Data :", json);
// });

/**
 * These are Custom function with flexible data conversions
 */

function JSONtoExcelCustom(jsonData, fileName, choice) {
  if (choice === "shop") {
    const shopData = jsonData.reduce((acc, transaction) => {
      const { shopName } = transaction;
      if (!acc[shopName]) acc[shopName] = [];
      acc[shopName].push(transaction);
      return acc;
    }, {});
    const wb = xlsx.utils.book_new();
    Object.keys(shopData).forEach((shopName) => {
      const ws = xlsx.utils.json_to_sheet(shopData[shopName]);
      xlsx.utils.book_append_sheet(wb, ws, shopName);
    });

    xlsx.writeFile(wb, `${fileName}.xlsx`);
    return "JSON to shopwise excel created !!!";
  }
}
const json = require("./data/transaction.json");
const res = JSONtoExcelCustom(json, "shopwiseReport", "shop");
console.log(res);

function JSONtoExcelCustom2(jsonData, fileName, choice) {
  const workbook = xlsx.utils.book_new();

  if (choice === "shop") {
    // Group data by shop name
    const shopData = jsonData.reduce((acc, transaction) => {
      const { shopName } = transaction;
      if (!acc[shopName]) acc[shopName] = [];
      acc[shopName].push(transaction);
      return acc;
    }, {});

    Object.keys(shopData).forEach((shopName) => {
      const ws = xlsx.utils.json_to_sheet(shopData[shopName]);
      xlsx.utils.book_append_sheet(workbook, ws, shopName);
    });

    xlsx.writeFile(workbook, `${fileName}_shopwise.xlsx`);
    return "JSON to shopwise Excel created!";
  } else if (choice === "month") {
    // Group data by month
    const monthData = jsonData.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().substring(0, 7); // Format "YYYY-MM"
      if (!acc[month]) acc[month] = [];
      acc[month].push(transaction);
      return acc;
    }, {});

    Object.keys(monthData).forEach((month) => {
      const ws = xlsx.utils.json_to_sheet(monthData[month]);
      xlsx.utils.book_append_sheet(workbook, ws, `Month_${month}`);
    });

    xlsx.writeFile(workbook, `${fileName}_monthwise.xlsx`);
    return "JSON to monthwise Excel created!";
  } else if (choice === "year") {
    // Group data by year
    const yearData = jsonData.reduce((acc, transaction) => {
      const year = new Date(transaction.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(transaction);
      return acc;
    }, {});

    Object.keys(yearData).forEach((year) => {
      const ws = xlsx.utils.json_to_sheet(yearData[year]);
      xlsx.utils.book_append_sheet(workbook, ws, `Year_${year}`);
    });

    xlsx.writeFile(workbook, `${fileName}_yearwise.xlsx`);
    return "JSON to yearwise Excel created!";
  } else if (choice === "week") {
    // Group data by week
    const weekData = jsonData.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const week = Math.ceil(
        ((date - new Date(year, 0, 1)) / 86400000 + date.getDay() + 1) / 7
      );
      const weekKey = `Year_${year}_Week_${week}`;

      if (!acc[weekKey]) acc[weekKey] = [];
      acc[weekKey].push(transaction);
      return acc;
    }, {});

    Object.keys(weekData).forEach((week) => {
      const ws = xlsx.utils.json_to_sheet(weekData[week]);
      xlsx.utils.book_append_sheet(workbook, ws, week);
    });

    xlsx.writeFile(workbook, `${fileName}_weekwise.xlsx`);
    return "JSON to weekwise Excel created!";
  }

  return "Invalid choice!";
}

// Usage Example
//   const json = require("./data/transaction.json");
const result = JSONtoExcelCustom2(json, "Report-m", "month");
const result1 = JSONtoExcelCustom2(json, "Report-y", "year");
const result2 = JSONtoExcelCustom2(json, "Report-w", "week");
const result3 = JSONtoExcelCustom2(json, "Report-s", "shop");
console.log({
  result,
  result1,
  result2,
  result3,
});
