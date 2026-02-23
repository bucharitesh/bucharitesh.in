import { TextHighlight } from '@/registry/bucharitesh/text-highlight';

export default function TextHighlightDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10">
      <TextHighlight
        color="255 232 62"
        angle="50deg"
        rotate="1deg"
        scale="1.1"
        skew="-5deg"
      >
        this is important
      </TextHighlight>
      <TextHighlight
        color="91 233 92"
        angle="30deg"
        scale="0.92"
        skew="7deg"
      >
        wait, this is also important
      </TextHighlight>
      <TextHighlight
        color="255 100 185"
        angle="150deg"
        rotate="0.5deg"
        skew="5deg"
      >
        wow, almost forgot this
      </TextHighlight>
    </div>
  );
}
