/**
 * Tailwind CSS 클래스명을 조합하는 유틸리티 함수
 * @param classes 클래스명들
 * @returns 결합된 클래스명
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
