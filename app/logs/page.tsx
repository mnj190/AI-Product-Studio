import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function LogsPage() {
  const entries = getEntries("logs").reverse();

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">Build Log</p>
        <h1>AI와 함께 만든 기록.</h1>
        <p>
          작업 과정, 의사결정, 프롬프트, 검증 결과를 날짜별로 남깁니다.
          Build Log는 작업 단위 원장이고, Daily Digest는 하루치 공유용 요약입니다.
        </p>
      </div>

      <div className="log-guide">
        <div>
          <span>01</span>
          <h3>What changed</h3>
          <p>어제 무엇을 만들었고 어떤 파일이 바뀌었는지 결과 중심으로 기록합니다.</p>
        </div>
        <div>
          <span>02</span>
          <h3>How AI helped</h3>
          <p>AI를 기획, 구현, 검증, 기록에 어떻게 사용했는지 구분해 남깁니다.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Prompt patterns</h3>
          <p>바이브 코딩을 처음 하는 사람이 따라 해볼 수 있는 요청 패턴을 추출합니다.</p>
        </div>
      </div>

      <div className="cards">
        {entries.map((entry) => (
          <ContentCard entry={entry} href={`/logs/${entry.slug}`} key={entry.slug} />
        ))}
      </div>
    </main>
  );
}
