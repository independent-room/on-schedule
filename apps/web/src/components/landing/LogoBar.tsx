export function LogoBar() {
  const shops = [
    { name: '베이커리', highlight: '우진' },
    { name: '살롱', highlight: '레인' },
    { name: '공방', highlight: '호두' },
    { name: '꽃집', highlight: '봄봄' },
    { name: '디저트', highlight: '모로' },
    { name: '카페', highlight: '하루' },
  ];

  return (
    <section className="border-y border-line-subtle bg-cream-50 py-8">
      <div className="mx-auto max-w-[1180px] px-6">
        <div
          className="mb-[22px] text-center text-[12px] font-semibold leading-none text-neutral-600"
          style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          베타 사장님 47분과 함께 만들고 있어요
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {shops.map((shop) => (
            <div
              key={shop.highlight}
              className="opacity-65 transition-opacity hover:opacity-100"
              style={{
                fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
                fontWeight: 800,
                fontSize: '18px',
                lineHeight: 1,
                letterSpacing: '-0.018em',
                color: 'rgba(46, 47, 51, 0.88)',
              }}
            >
              {shop.name}{' '}
              <em className="not-italic text-brand-500">{shop.highlight}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
