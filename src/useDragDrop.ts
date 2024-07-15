import { useState } from 'react';

export type Section = {
  id: string;
  title: string;
};

export const useDragDrop = (initialSections: Section[]) => {
  const [sections, setSections] = useState(initialSections);

  const handleDragStart = (index: number) => {
    // Set the section being dragged in local storage
    localStorage.setItem('draggedSection', JSON.stringify(sections[index]));
  };

  const handleDragOver = (index: number) => {
    const draggedSection = JSON.parse(localStorage.getItem('draggedSection') || '');
    if (!draggedSection) return;
    
    // Ensure it's not the same index and rearrange sections
    if (draggedSection.id !== sections[index].id) {
      const newSections = [...sections];
      newSections.splice(index, 0, draggedSection);
      setSections(newSections.filter((_, idx) => idx !== index));
    }
  };

  const handleDragEnd = () => {
    // Remove the dragged section from local storage
    localStorage.removeItem('draggedSection');
  };

  return {
    sections,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
