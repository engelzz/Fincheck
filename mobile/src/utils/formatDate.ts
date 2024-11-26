export function FormatDate(date: Date) {
  return Intl.DateTimeFormat('pt-br').format(date);
}
