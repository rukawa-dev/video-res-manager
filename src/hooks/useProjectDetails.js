import { useState, useEffect, useCallback } from 'react';

export const useProjectDetails = (id, showModal, updateGlobalTask) => {
  const [task, setTask] = useState(null);
  const [details, setDetails] = useState({
    gemResultUrl: '',
    scriptContent: '',
    narrationWithNames: '',
    narrationNoNames: ''
  });

  useEffect(() => {
    // Load task basic info
    const tasks = JSON.parse(localStorage.getItem('vrm_tasks') || '[]');
    const currentTask = tasks.find(t => t.id === parseInt(id));
    if (currentTask) {
      setTask(currentTask);
    }

    // Load detailed data
    setDetails({
      gemResultUrl: localStorage.getItem(`gem_result_url_${id}`) || '',
      scriptContent: localStorage.getItem(`gem_script_content_${id}`) || '',
      narrationWithNames: localStorage.getItem(`narration_with_names_${id}`) || '',
      narrationNoNames: localStorage.getItem(`narration_no_names_${id}`) || ''
    });
  }, [id]);

  const saveDetail = useCallback((key, value) => {
    setDetails(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(`${key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)}_${id}`, value);
    // Adjust key naming to match existing localStorage convention if needed
    // The previous used: gem_result_url, gem_script_content, narration_with_names, narration_no_names
    let storageKey = '';
    if (key === 'gemResultUrl') storageKey = 'gem_result_url';
    else if (key === 'scriptContent') storageKey = 'gem_script_content';
    else if (key === 'narrationWithNames') storageKey = 'narration_with_names';
    else if (key === 'narrationNoNames') storageKey = 'narration_no_names';

    if (storageKey) {
      localStorage.setItem(`${storageKey}_${id}`, value);
    }
  }, [id]);

  const analyzeScript = () => {
    if (!details.scriptContent) {
      showModal('대본 내용이 없습니다.');
      return;
    }

    // 1. Extract title
    const titleRegex = /{{추천 제목}}[\s\n]+1\.\s*(.+)/;
    const titleMatch = details.scriptContent.match(titleRegex);

    if (titleMatch && titleMatch[1]) {
      const newTitle = titleMatch[1].trim();
      updateGlobalTask(id, newTitle);
      setTask(prev => ({ ...prev, title: newTitle }));
    }

    // 2. Extract narration
    const narrationRegex = /{{나레이션}}\n([\s\S]+?)(?=\n{{|$)/;
    const narrationMatch = details.scriptContent.match(narrationRegex);

    if (narrationMatch && narrationMatch[1]) {
      const narration = narrationMatch[1].trim();
      const noNames = narration.replace(/\[[^\]]+\]\s*/g, '');

      saveDetail('narrationWithNames', narration);
      saveDetail('narrationNoNames', noNames);
    } else {
      showModal('추출할 수 있는 나레이션 정보를 찾지 못했습니다.');
    }
  };

  return {
    task,
    details,
    saveDetail,
    analyzeScript
  };
};
