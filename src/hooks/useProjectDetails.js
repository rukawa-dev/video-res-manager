import { useState, useEffect, useCallback } from 'react';
import gemsOptions from '../../⭐️ 옵션.json';

export const useProjectDetails = (id, showModal, updateGlobalTask) => {
  const [task, setTask] = useState(null);
  const [details, setDetails] = useState({
    gemResultUrl: '',
    scriptContent: '',
    narrationWithNames: '',
    narrationNoNames: '',
    mainImagePrompt: '',
    commonPromptOptions: [],
    imageRatio: '16:9',
    sceneImagePrompt: '',
    scenePrefixOptions: [],
    analysisResult: ''
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
      narrationNoNames: localStorage.getItem(`narration_no_names_${id}`) || '',
      mainImagePrompt: localStorage.getItem(`main_image_prompt_${id}`) || '',
      commonPromptOptions: (() => {
        const saved = localStorage.getItem(`common_prompt_options_${id}`);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            return [saved]; // 호환성을 위해 문자열인 경우 배열로 감쌈
          }
        }
        return gemsOptions["공통 프롬프트 기본값"] || [];
      })(),
      imageRatio: localStorage.getItem(`image_ratio_${id}`) || '16:9',
      sceneImagePrompt: localStorage.getItem(`scene_image_prompt_${id}`) || '',
      scenePrefixOptions: (() => {
        const saved = localStorage.getItem(`scene_prefix_options_${id}`);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            return [saved];
          }
        }
        return gemsOptions["장면별 이미지 프롬프트 기본값"] || [];
      })(),
      analysisResult: localStorage.getItem(`analysis_result_${id}`) || ''
    });
  }, [id]);

  const saveDetail = useCallback((key, value) => {
    setDetails(prev => ({ ...prev, [key]: value }));

    // Unify key naming for localStorage
    let storageKey = '';
    if (key === 'gemResultUrl') storageKey = 'gem_result_url';
    else if (key === 'scriptContent') storageKey = 'gem_script_content';
    else if (key === 'narrationWithNames') storageKey = 'narration_with_names';
    else if (key === 'narrationNoNames') storageKey = 'narration_no_names';
    else if (key === 'mainImagePrompt') storageKey = 'main_image_prompt';
    else if (key === 'commonPromptOptions') storageKey = 'common_prompt_options';
    else if (key === 'imageRatio') storageKey = 'image_ratio';
    else if (key === 'sceneImagePrompt') storageKey = 'scene_image_prompt';
    else if (key === 'scenePrefixOptions') storageKey = 'scene_prefix_options';
    else if (key === 'analysisResult') storageKey = 'analysis_result';

    if (storageKey) {
      const storageValue = Array.isArray(value) ? JSON.stringify(value) : value;
      localStorage.setItem(`${storageKey}_${id}`, storageValue);
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

    // 3. Extract Analysis Result (Title, Keywords, Desc, Comments) for Upload Ready
    let analysis = {
      titles: [],
      keywords: '',
      description: '',
      comments: []
    };

    const titleBlockMatch = details.scriptContent.match(/{{추천 제목}}([\s\S]+?)(?=\n{{|$)/);
    if (titleBlockMatch) {
      const lines = titleBlockMatch[1].trim().split(/\d+\.\s+/).filter(Boolean);
      analysis.titles = lines.map(line => line.trim());
    }

    const keywordBlockMatch = details.scriptContent.match(/{{추천 키워드}}([\s\S]+?)(?=\n{{|$)/);
    if (keywordBlockMatch) {
      analysis.keywords = keywordBlockMatch[1].trim();
    }

    const descBlockMatch = details.scriptContent.match(/{{설명글}}([\s\S]+?)(?=\n{{|$)/);
    if (descBlockMatch) {
      analysis.description = descBlockMatch[1].trim();
    }

    const commentBlockMatch = details.scriptContent.match(/{{추천 댓글}}([\s\S]+?)(?=\n{{|$)/);
    if (commentBlockMatch) {
      const lines = commentBlockMatch[1].trim().split(/\d+\.\s+/).filter(Boolean);
      analysis.comments = lines.map(line => line.trim());
    }

    if (analysis.titles.length > 0 || analysis.keywords || analysis.description || analysis.comments.length > 0) {
      saveDetail('analysisResult', JSON.stringify(analysis));
    }
  };

  return {
    task,
    details,
    saveDetail,
    analyzeScript
  };
};
