export function GetErrorDescriptionByCode(code) {
  if (code === 404) return "صفحه مورد نظر شما یافت نشد!";
  if (code === 400) return "درخواست شما قابل قبول نمی‌باشد!";
  if (code === 403) return "متاسفانه امکان دسترسی شما وجود ندارد!";
  if (code === 500) return "متاسفانه سرور در حال حاضر دچار خطا شده است!";
}
