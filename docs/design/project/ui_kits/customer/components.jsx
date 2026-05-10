// Customer mobile reservation page — 예약톡 고객 예약 페이지
const { useState } = React;

const StoreHeader = ({ store }) => (
  <header style={{padding:'20px 20px 16px',borderBottom:'1px solid var(--line-subtle)',background:'#fff'}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <div style={{width:48,height:48,borderRadius:12,background:'var(--c-brand-100)',display:'flex',alignItems:'center',justifyContent:'center',font:'800 18px/1 var(--font-display)',color:'var(--c-brand-700)'}}>{store.emoji}</div>
      <div>
        <div style={{font:'700 17px/1.2 var(--font-display)',letterSpacing:'-0.018em'}}>{store.name}</div>
        <div style={{font:'500 12px/1.4 var(--font-sans)',color:'var(--fg-tertiary)',marginTop:4}}>{store.address} · {store.hours}</div>
      </div>
    </div>
  </header>
);

const StepBar = ({ step, total }) => (
  <div style={{padding:'14px 20px',display:'flex',gap:6,alignItems:'center'}}>
    {Array.from({length:total}).map((_,i) => (
      <div key={i} style={{flex:1,height:4,borderRadius:99,background:i<step?'var(--c-brand-500)':'var(--c-neutral-200)'}}/>
    ))}
    <span style={{font:'600 12px/1 var(--font-mono)',color:'var(--fg-tertiary)',marginLeft:8}}>{step}/{total}</span>
  </div>
);

const MenuItem = ({ item, selected, onSelect }) => (
  <button onClick={()=>onSelect(item.id)} style={{
    display:'flex',gap:14,alignItems:'center',padding:14,
    background:selected?'var(--c-brand-50)':'#fff',
    border:'1px solid '+(selected?'var(--c-brand-500)':'var(--line-normal)'),
    borderWidth:selected?2:1,
    borderRadius:14,textAlign:'left',cursor:'pointer',width:'100%'
  }}>
    <div style={{width:64,height:64,borderRadius:10,background:'var(--c-cream-100)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>{item.emoji}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{font:'600 15px/1.3 var(--font-sans)'}}>{item.name}</div>
      <div style={{font:'500 12px/1.4 var(--font-sans)',color:'var(--fg-tertiary)',marginTop:4}}>{item.desc}</div>
      <div style={{font:'700 14px/1 var(--font-sans)',color:'var(--c-brand-700)',marginTop:8,fontVariantNumeric:'tabular-nums'}}>{item.price.toLocaleString()}원</div>
    </div>
  </button>
);

const TimeSlot = ({ time, available, selected, onSelect }) => (
  <button disabled={!available} onClick={()=>onSelect(time)} style={{
    padding:'12px 0',borderRadius:10,
    background:selected?'var(--c-brand-500)':(available?'#fff':'var(--c-neutral-50)'),
    color:selected?'#fff':(available?'var(--fg-primary)':'var(--fg-quaternary)'),
    border:'1px solid '+(selected?'var(--c-brand-500)':'var(--line-strong)'),
    font:'600 14px/1 var(--font-sans)',cursor:available?'pointer':'not-allowed',
    fontVariantNumeric:'tabular-nums'
  }}>{time}</button>
);

const Summary = ({ menu, time, deposit }) => (
  <div style={{margin:'20px',padding:18,background:'var(--bg-hero)',borderRadius:14,display:'flex',flexDirection:'column',gap:10}}>
    <div style={{font:'700 14px/1 var(--font-sans)',marginBottom:4}}>예약 요약</div>
    <Row k="메뉴" v={menu||'—'}/>
    <Row k="픽업" v={time||'—'}/>
    <Row k="선입금" v={deposit?deposit.toLocaleString()+'원':'—'} bold/>
  </div>
);
const Row = ({k,v,bold}) => (
  <div style={{display:'flex',justifyContent:'space-between',font:'500 13px/1.4 var(--font-sans)'}}>
    <span style={{color:'var(--fg-tertiary)'}}>{k}</span>
    <span style={{color:'var(--fg-primary)',fontWeight:bold?700:500,fontVariantNumeric:'tabular-nums'}}>{v}</span>
  </div>
);

const FixedBottom = ({ disabled, label, onClick }) => (
  <div style={{position:'sticky',bottom:0,background:'rgba(255,255,255,0.96)',backdropFilter:'blur(8px)',borderTop:'1px solid var(--line-subtle)',padding:16}}>
    <button disabled={disabled} onClick={onClick} style={{
      width:'100%',height:54,borderRadius:12,border:'none',
      background:disabled?'var(--c-neutral-200)':'var(--c-brand-500)',
      color:disabled?'var(--fg-quaternary)':'#fff',
      font:'700 16px/1 var(--font-sans)',cursor:disabled?'not-allowed':'pointer'
    }}>{label}</button>
  </div>
);

const SuccessScreen = ({ menu, time }) => (
  <div style={{padding:'48px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:16,textAlign:'center'}}>
    <div style={{width:72,height:72,borderRadius:99,background:'var(--c-success-50)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,color:'var(--c-success-600)'}}>✓</div>
    <h2 style={{font:'700 24px/1.2 var(--font-display)',letterSpacing:'-0.024em',margin:0}}>예약이 확정됐어요</h2>
    <p style={{font:'500 14px/1.6 var(--font-sans)',color:'var(--fg-secondary)',margin:0}}>
      {time}에 픽업하실 <strong style={{color:'var(--fg-primary)'}}>{menu}</strong><br/>
      확인 알림톡을 보내드렸어요.
    </p>
    <div style={{marginTop:8,padding:'12px 16px',background:'var(--c-brand-50)',borderRadius:10,font:'600 13px/1.4 var(--font-sans)',color:'var(--c-brand-700)'}}>
      예약번호 RES-2026-0315-A19
    </div>
  </div>
);

Object.assign(window, { StoreHeader, StepBar, MenuItem, TimeSlot, Summary, FixedBottom, SuccessScreen });
