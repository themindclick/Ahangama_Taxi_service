// PaymentBanner.jsx — Taxi Service Ahangama
// Single raw row, fully responsive

import React from "react";

const items = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#005acd" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "Secure Payments",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#26A17B"/><text x="11" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial">₮</text></svg>
    ),
    label: "USDT",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#F7931A"/><text x="11" y="16.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial">₿</text></svg>
    ),
    label: "Bitcoin",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#005acd" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
      </svg>
    ),
    label: "Bank Transfer",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#7B3F1E"/><text x="11" y="15.5" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" fontFamily="Arial">LKR</text></svg>
    ),
    label: "LKR",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#1a6b3c"/><text x="11" y="16.5" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Arial">$</text></svg>
    ),
    label: "USD",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#003087"/><text x="11" y="16.5" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="Arial">€</text></svg>
    ),
    label: "EUR",
  },
];

export default function paymentbanner() {
  return (
    <>
      <style>{`
        .pb {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          box-shadow: 0 2px 10px rgba(0,31,107,.05);
          overflow: hidden;
        }

        .pb-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          border-right: 1.5px solid #e2e8f0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pb-item:last-child { border-right: none; }

        .pb-item__label {
          font-size: .78rem;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: .01em;
        }

        /* Push last item (currencies note) to far right on desktop */
        .pb-spacer { flex: 1; }

        .pb-note {
          padding: 14px 0 14px 18px;
          font-size: .72rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
          letter-spacing: .02em;
        }

        /* Mobile: 2-column wrap */
        @media (max-width: 640px) {
          .pb {
            padding: 0 12px;
            border-radius: 10px;
          }
          .pb-item {
            padding: 11px 12px;
            border-right: 1.5px solid #e2e8f0;
            flex: 1 0 calc(50% - 24px);
          }
          /* Kill right border on even items (right column) */
          .pb-item:nth-child(even) { border-right: none; }
          /* Add bottom border between rows */
          .pb-item { border-bottom: 1.5px solid #e2e8f0; }
          .pb-item:nth-last-child(-n+2) { border-bottom: none; }
          .pb-spacer { display: none; }
          .pb-note {
            width: 100%;
            padding: 10px 12px;
            text-align: center;
            border-top: 1.5px solid #e2e8f0;
          }
        }
      `}</style>

      <div className="pb">
        {items.map((item, i) => (
          <div key={i} className="pb-item">
            {item.icon}
            <span className="pb-item__label">{item.label}</span>
          </div>
        ))}
        <div className="pb-spacer" />
        <p className="pb-note">All major currencies accepted</p>
      </div>
    </>
  );
}