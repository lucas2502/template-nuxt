export default function useAssets(asset: string) {
  const assets = import.meta.glob('~/assets/*/*.{jpg,jpeg,png,gif,webp,svg}', {
    eager: true,
    import: 'default'
  });

  return assets[asset] ? (assets[asset] as string) : asset;
}
