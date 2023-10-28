export const FormatDate = (inputDate: Date | null) => {
  const now = inputDate || new Date()
  // const year = now.getFullYear()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const day = now.getDay()
  const week = ['日', '月', '火', '水', '木', '金', '土'][day]

  return `${year}年${month}月${date}日 (${week})`
}
