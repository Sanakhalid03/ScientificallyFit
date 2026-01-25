"use client";
import styled from "styled-components";
import Link from "next/link";

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 260px;
    height: 340px;
    background: linear-gradient(135deg, #6366f1, #06b6d4);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem;
    border-radius: 18px;
    cursor: pointer;
    color: white;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    transition: transform 0.4s ease;
  }

  .card:hover {
    transform: translateY(-10px) scale(1.02);
  }

  .card::before,
  .card::after {
    position: absolute;
    content: "";
    width: 20%;
    height: 20%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(6px);
    transition: all 0.5s ease;
  }

  .card::before {
    top: 0;
    right: 0;
    border-radius: 0 18px 0 100%;
  }

  .card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100% 0 18px;
  }

  .card:hover::before,
  .card:hover::after {
    width: 100%;
    height: 100%;
    border-radius: 18px;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  .tag {
    display: inline-block;
    font-size: 0.7rem;
    background: rgba(255,255,255,0.25);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
  }

  .desc {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-top: 0.4rem;
  }
`;

export default function ArticleCard({ article }: { article: any }) {
  return (
    <StyledWrapper>
      <Link href={`/learn/${article.slug}`}>
        <div className="card">
          <div className="content">
            <span className="tag">{article.category}</span>
            <h3 className="title">{article.title}</h3>
            <p className="desc">{article.excerpt}</p>
          </div>
        </div>
      </Link>
    </StyledWrapper>
  );
}
