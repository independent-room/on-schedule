// Owner dashboard components — 예약톡 사장님 대시보드
// Single file, factored small. Uses CSS variables from ../../colors_and_type.css

const { useState } = React;

const Sidebar = ({ active, onChange }) => {
  const items = [
    { id: 'today', label: '오늘 예약', icon: '☉' },
    { id: 'calendar', label: '캘린더', icon: '▦' },
    { id: 'customers', label: '고객', icon: '◉' },
    { id: 'menu', label: '메뉴', icon: '▤' },
    { id: 'alimtalk', label: '알림톡', icon: '✉' },
    { id: 'stats', label: '통계', icon: '◫' },
  ];
  return (
    <aside style={{width:240,background:'#fff',borderRight:'1px solid var(--line-normal)',padding:'20px 12px',display:'flex',flexDirection:'column',gap:4,height:'100vh',position:'sticky',top:0}}>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px 18px'}}>
        <img src="../../assets/logo-mark.svg" width="28" height="28" alt=""/>
        <span style={{font:'700 17px/1 var(--font-display)',letterSpacing:'-0.02em'}}>예약톡</span>
      </div>
      {items.map(it => (
        <button key={it.id} onClick={()=>onChange(it.id)} style={{
          display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:'none',background:active===it.id?'var(--c-brand-50)':'transparent',color:active===it.id?'var(--c-brand-700)':'var(--fg-secondary)',
          borderRadius:10,font:'600 14px/1 var(--font-sans)',cursor:'pointer',textAlign:'left'
        }}>
          <span style={{width:20,textAlign:'center',color:active===it.id?'var(--c-brand-500)':'var(--fg-tertiary)'}}>{it.icon}</span>
          {it.label}
        </button>
      ))}
      <div style={{marginTop:'auto',padding:'12px',borderTop:'1px solid var(--line-subtle)',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:32,height:32,borderRadius:99,background:'var(--c-brand-100)',color:'var(--c-brand-700)',display:'flex',alignItems:'center',justifyContent:'center',font:'700 13px/1 var(--font-sans)'}}>우진</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{font:'600 13px/1.2 var(--font-sans)'}}>베이커리 우진</div>
          <div style={{font:'500 11px/1.2 var(--font-sans)',color:'var(--fg-tertiary)'}}>사장님 · 우진베이커리</div>
        </div>
      </div>
    </aside>
  );
};

const Topbar = ({ title, sub }) => (
  <header style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:'24px 32px',borderBottom:'1px solid var(--line-subtle)'}}>
    <div>
      <div style={{font:'500 13px/1 var(--font-sans)',color:'var(--fg-tertiary)',marginBottom:8}}>{sub}</div>
      <h1 style={{font:'700 28px/1 var(--font-display)',letterSpacing:'-0.024em',margin:0}}>{title}</h1>
    </div>
    <div style={{display:'flex',gap:8}}>
      <button style={btnSecondary}>알림톡 보내기</button>
      <button style={btnPrimary}>+ 예약 추가</button>
    </div>
  </header>
);

const KpiRow = () => {
  const stats = [
    { lab:'오늘 예약', val:'12건', delta:'+3', up:true },
    { lab:'이번 주 매출', val:'₩ 1,830,000', delta:'+12.4%', up:true },
    { lab:'노쇼율 (30일)', val:'2.1%', delta:'-1.4%p', up:true },
    { lab:'알림톡 (오늘)', val:'38건', delta:'전송 완료', neutral:true },
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,padding:'24px 32px 0'}}>
      {stats.map(s => (
        <div key={s.lab} style={{background:'#fff',border:'1px solid var(--line-normal)',borderRadius:14,padding:18,display:'flex',flexDirection:'column',gap:8}}>
          <span style={{font:'600 12px/1 var(--font-sans)',color:'var(--fg-tertiary)',letterSpacing:'0.02em',textTransform:'uppercase'}}>{s.lab}</span>
          <span style={{font:'800 28px/1 var(--font-display)',fontVariantNumeric:'tabular-nums'}}>{s.val}</span>
          <span style={{font:'600 12px/1 var(--font-sans)',color:s.neutral?'var(--fg-tertiary)':(s.up?'var(--c-success-600)':'var(--c-danger-600)')}}>
            {s.up && !s.neutral ? '▲ ' : ''}{s.delta}
          </span>
        </div>
      ))}
    </div>
  );
};

const Badge = ({ kind, children }) => {
  const styles = {
    ok: { bg:'var(--c-success-50)', fg:'var(--c-success-600)' },
    wait: { bg:'var(--c-warning-50)', fg:'var(--c-warning-600)' },
    noshow: { bg:'var(--c-danger-50)', fg:'var(--c-danger-600)' },
    money: { bg:'var(--c-brand-50)', fg:'var(--c-brand-700)' },
  }[kind] || {};
  return <span style={{padding:'3px 9px',borderRadius:99,font:'600 11px/1.4 var(--font-sans)',background:styles.bg,color:styles.fg}}>{children}</span>;
};

const ReservationCard = ({ time, date, name, menu, status, money, onConfirm, onPickup }) => (
  <div style={{background:'#fff',border:'1px solid var(--line-normal)',borderRadius:14,padding:'14px 18px',display:'grid',gridTemplateColumns:'72px 1fr auto',gap:18,alignItems:'center'}}>
    <div style={{textAlign:'center'}}>
      <div style={{font:'700 22px/1 var(--font-display)',fontVariantNumeric:'tabular-nums'}}>{time}</div>
      <div style={{font:'500 12px/1 var(--font-sans)',color:'var(--fg-tertiary)',marginTop:4}}>{date}</div>
    </div>
    <div>
      <div style={{font:'700 15px/1 var(--font-sans)'}}>{name}</div>
      <div style={{font:'500 13px/1.5 var(--font-sans)',color:'var(--fg-secondary)',marginTop:4}}>{menu}</div>
      <div style={{display:'flex',gap:6,marginTop:8}}>
        <Badge kind={status.kind}>{status.label}</Badge>
        {money && <Badge kind="money">선입금 {money}</Badge>}
      </div>
    </div>
    <div style={{display:'flex',gap:8}}>
      {status.kind==='wait' && <><button style={btnSecondary}>거절</button><button style={btnPrimary} onClick={onConfirm}>확정</button></>}
      {status.kind==='ok' && <><button style={btnSecondary}>메시지</button><button style={btnPrimary} onClick={onPickup}>픽업 완료</button></>}
      {status.kind==='noshow' && <button style={btnSecondary}>기록</button>}
    </div>
  </div>
);

const TodayList = ({ items, onConfirm, onPickup }) => (
  <section style={{padding:'24px 32px',display:'flex',flexDirection:'column',gap:12}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <h2 style={{font:'700 20px/1 var(--font-display)',margin:0,letterSpacing:'-0.018em'}}>오늘 받은 예약 <span style={{color:'var(--c-brand-500)'}}>{items.length}건</span></h2>
      <div style={{display:'flex',gap:6}}>
        <Chip active>전체 {items.length}</Chip>
        <Chip>확정 {items.filter(i=>i.status.kind==='ok').length}</Chip>
        <Chip>대기 {items.filter(i=>i.status.kind==='wait').length}</Chip>
      </div>
    </div>
    {items.map((it, i) => (
      <ReservationCard key={i} {...it} onConfirm={()=>onConfirm(i)} onPickup={()=>onPickup(i)} />
    ))}
  </section>
);

const Chip = ({ active, children }) => (
  <button style={{
    padding:'6px 12px',borderRadius:99,border:'1px solid '+(active?'var(--c-brand-500)':'var(--line-strong)'),
    background:active?'var(--c-brand-50)':'#fff',color:active?'var(--c-brand-700)':'var(--fg-secondary)',
    font:'600 12px/1 var(--font-sans)',cursor:'pointer'
  }}>{children}</button>
);

const btnPrimary = {height:36,padding:'0 14px',borderRadius:8,background:'var(--c-brand-500)',color:'#fff',border:'none',font:'600 13px/1 var(--font-sans)',cursor:'pointer'};
const btnSecondary = {height:36,padding:'0 14px',borderRadius:8,background:'#fff',border:'1px solid var(--line-strong)',color:'var(--fg-primary)',font:'600 13px/1 var(--font-sans)',cursor:'pointer'};

const AlimtalkModal = ({ open, onClose }) => {
  if(!open) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}} onClick={onClose}>
      <div style={{background:'#fff',width:540,borderRadius:20,padding:24,boxShadow:'var(--shadow-4)'}} onClick={e=>e.stopPropagation()}>
        <h3 style={{font:'700 20px/1 var(--font-display)',margin:'0 0 6px'}}>알림톡 미리보기</h3>
        <p style={{font:'500 13px/1.5 var(--font-sans)',color:'var(--fg-tertiary)',margin:'0 0 18px'}}>김민지 외 11명에게 발송됩니다 · 건당 8원</p>
        <div style={{background:'#B2C7DA',padding:24,borderRadius:14,display:'flex',justifyContent:'center'}}>
          <div style={{width:280,background:'#fff',borderRadius:14,padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,borderBottom:'1px solid var(--line-subtle)',paddingBottom:8,marginBottom:10}}>
              <span style={{background:'#FEE500',color:'#3B1E1E',font:'800 9px/1 var(--font-sans)',padding:'2px 5px',borderRadius:3}}>알림톡</span>
              <span style={{font:'700 12px/1 var(--font-sans)'}}>베이커리 우진</span>
            </div>
            <div style={{font:'700 15px/1.4 var(--font-sans)',marginBottom:8}}>내일 픽업 잊지 마세요</div>
            <div style={{font:'500 13px/1.55 var(--font-sans)'}}>안녕하세요. 내일 오후 3시에 예약하신 케이크 잊지 마세요!</div>
            <div style={{marginTop:12,padding:10,background:'var(--c-neutral-50)',borderRadius:8,textAlign:'center',font:'600 13px/1 var(--font-sans)'}}>예약 상세 보기</div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:20}}>
          <button style={btnSecondary} onClick={onClose}>취소</button>
          <button style={btnPrimary}>12명에게 보내기</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Sidebar, Topbar, KpiRow, TodayList, ReservationCard, AlimtalkModal, Badge, Chip, btnPrimary, btnSecondary });
