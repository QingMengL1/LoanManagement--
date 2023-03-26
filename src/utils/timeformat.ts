export function timeFormat(value: string) {
  // 假设 date 是您要格式化的日期
  let date = new Date(value);

  // 获取年份、月份和日期
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 在月份和日期中添加前导零，以确保格式为两位数
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // 将结果格式化为 YYYY-MM-DD
  return year + "-" + month + "-" + day;
}
