import { Day } from '@/lib/types'
import styled from 'styled-components'
import { Check, Lock } from 'lucide-react'

interface DayCardProps {
  day: Day
  weekId: number
  onClick: () => void
}

export function DayCard({ day, weekId, onClick }: DayCardProps) {
  return (
    <StyledWrapper>
      <button
        className={`card ${day.isLocked ? 'locked' : ''}`}
        onClick={onClick}
        disabled={day.isLocked}
      >
        <div className="content">
          <div className="badge">
            Week {weekId} · Day {day.id}
          </div>

          <h3>{day.title}</h3>
          <p className="desc">{day.description}</p>

          {day.isComplete && (
            <div className="status complete">
              <Check size={16} /> Completed
            </div>
          )}

          {day.isLocked && (
            <div className="status locked">
              <Lock size={16} /> Locked
            </div>
          )}
        </div>
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .card {
    width: 220px;
    height: 180px;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
  }

  .card::before,
  .content {
    border-radius: 16px;
    transition: transform 400ms ease, box-shadow 300ms ease;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      #e0e7ff,
      #fce7f3,
      #ecfeff
    );
    transform: rotateZ(4deg);
  }

  .content {
    position: absolute;
    inset: 0;
    padding: 20px;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.9),
      rgba(255,255,255,0.7)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.6);
    transform: rotateZ(-4deg);
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  .card:hover::before,
  .card:hover .content {
    transform: rotateZ(0deg);
  }

  .locked {
    opacity: 0.5;
    cursor: not-allowed;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2933;
  }

  .desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }

  .badge {
    align-self: flex-start;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    background: linear-gradient(
      to right,
      #c7d2fe,
      #fbcfe8
    );
    color: #3730a3;
  }

  .status {
    margin-top: auto;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }

  .complete {
    color: #059669;
  }

  .locked {
    color: #6b7280;
  }

  /* ====================== */
  /* Responsive adjustments */
  /* ====================== */
  @media (max-width: 1024px) {
    .card {
      width: 180px;
      height: 160px;
    }
    h3 {
      font-size: 15px;
    }
    .desc {
      font-size: 12px;
    }
    .badge {
      font-size: 10px;
      padding: 3px 8px;
    }
  }

  @media (max-width: 640px) {
    .card {
      width: 100%;
      height: auto;
      min-height: 150px;
      margin-bottom: 12px;
    }
    .content {
      padding: 16px;
    }
    h3 {
      font-size: 14px;
    }
    .desc {
      font-size: 12px;
    }
    .badge {
      font-size: 10px;
      padding: 2px 6px;
    }
  }
`
