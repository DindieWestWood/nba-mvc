import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useNumberTransform() {
  const { locale } = useI18n();
  
  const shortUSDFormatter = computed(() =>
    new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency: 'USD',
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );

  const numberToShortUSD = (amount?: number) =>
    amount ? shortUSDFormatter.value.format(amount) : '-';

  return {
    numberToShortUSD,
  }
  
}
