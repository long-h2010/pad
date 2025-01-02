import { useEffect, useState } from "react";

export default function Speak(content: any) {
  const vietnamesePattern = /[àáảãạâầẩẫậăằắẵặêềểễệôồổỗộơờởỡợưừửữựđ]/i;
  const englishPattern = /^[a-zA-Z\s,.!?';:()]+$/;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      let voiceToSelect: SpeechSynthesisVoice | undefined;

      if (englishPattern.test(content.content)) {
        voiceToSelect = availableVoices.find((voice) =>
          voice.lang.startsWith("it")
        );
      }

      if (voiceToSelect) {
        setSelectedVoice(voiceToSelect);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [content.content]);



  const handleClick = () => {
    if (content.content && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(content.content);
      utterance.voice = selectedVoice; // Gán giọng nói được chọn
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Selected voice is not available");
    }
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <>
      <button onClick={handleClick}>Speak</button>
      <button onClick={handleCancel}>Cancel</button>
    </>
  );
}
