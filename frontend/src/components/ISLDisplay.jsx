import React, { useState, useEffect, useCallback } from 'react';
import { textToImageSequence } from '../utils/islMapping';

/**
 * ISLDisplay Component
 * Displays text as ISL (Indian Sign Language) images
 * - First shows the full text
 * - Then iterates through each word showing corresponding ISL images
 * - Supports configurable timing and loop modes
 */
export default function ISLDisplay({
  text,
  autoPlay = true,
  showFullTextDuration = 3000, // ms to show full text before starting word-by-word
  wordDuration = 2000, // ms per word/image
  loop = true,
  onSequenceComplete,
  className = '',
  showText = true,
  imageStyle = {},
  textStyle = {},
}) {
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = showing full text
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullText, setShowFullText] = useState(true);

  // Generate sequence when text changes
  useEffect(() => {
    if (text) {
      const seq = textToImageSequence(text);
      setSequence(seq);
      setCurrentIndex(-1);
      setShowFullText(true);
    } else {
      setSequence([]);
      setCurrentIndex(-1);
      setShowFullText(true);
    }
  }, [text]);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || sequence.length === 0) return;

    let timeoutId;

    if (showFullText) {
      // Show full text first
      timeoutId = setTimeout(() => {
        setShowFullText(false);
        setCurrentIndex(0);
        setIsPlaying(true);
      }, showFullTextDuration);
    } else if (isPlaying && currentIndex < sequence.length) {
      // Show each word/image
      timeoutId = setTimeout(() => {
        if (currentIndex < sequence.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Sequence complete
          setIsPlaying(false);
          if (loop) {
            // Restart after a short pause
            setTimeout(() => {
              setCurrentIndex(-1);
              setShowFullText(true);
            }, 1000);
          } else if (onSequenceComplete) {
            onSequenceComplete();
          }
        }
      }, wordDuration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showFullText, isPlaying, currentIndex, sequence.length, autoPlay, showFullTextDuration, wordDuration, loop, onSequenceComplete]);

  // Handle manual navigation
  const goToWord = useCallback((index) => {
    setIsPlaying(false);
    if (index === -1) {
      setShowFullText(true);
      setCurrentIndex(-1);
    } else {
      setShowFullText(false);
      setCurrentIndex(index);
    }
  }, []);

  const play = useCallback(() => {
    if (showFullText) {
      setShowFullText(false);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }, [showFullText]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const restart = useCallback(() => {
    setCurrentIndex(-1);
    setShowFullText(true);
    setIsPlaying(false);
  }, []);

  // Current item
  const currentItem = currentIndex >= 0 && currentIndex < sequence.length
    ? sequence[currentIndex]
    : null;

  // Render full text
  const renderFullText = () => (
    <div className="isl-full-text" style={textStyle}>
      <p className="text-center text-lg font-medium leading-relaxed whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );

  // Render current word/image
  const renderCurrentItem = () => {
    if (!currentItem) return null;

    const hasImage = currentItem.imagePath;

    return (
      <div className="isl-word-display flex flex-col items-center justify-center gap-4">
        {showText && (
          <div className="isl-word-text" style={textStyle}>
            <span className="text-xl font-semibold text-center">
              {currentItem.word}
            </span>
          </div>
        )}
        {hasImage && (
          <div className="isl-word-image">
            <img
              src={currentItem.imagePath}
              alt={`ISL sign for `}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                ...imageStyle,
              }}
            />
          </div>
        )}
        {!hasImage && (
          <div className="isl-word-placeholder text-center text-slate-500 dark:text-slate-400 py-8 px-4">
            <p className="text-sm">No ISL image available for: <strong>{currentItem.word}</strong></p>
            <p className="text-xs mt-1">Word will be skipped in sequence</p>
          </div>
        )}
      </div>
    );
  };

  // Progress indicator
  const renderProgress = () => {
    if (showFullText || sequence.length === 0) return null;

    return (
      <div className="isl-progress mt-4">
        <div className="flex items-center justify-center gap-1">
          {sequence.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-blue-500 w-6'
                  : idx < currentIndex
                  ? 'bg-green-500'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-1">
          {showFullText ? 'Showing full announcement...' : `Word ${currentIndex + 1} of ${sequence.length}`}
        </p>
      </div>
    );
  };

  // Controls
  const renderControls = () => {
    if (sequence.length === 0) return null;

    return (
      <div className="isl-controls flex items-center justify-center gap-2 mt-4">
        <button
          onClick={restart}
          className="px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600"
          disabled={showFullText && currentIndex === -1}
        >
          ↺ Restart
        </button>
        {isPlaying ? (
          <button
            onClick={pause}
            className="px-3 py-1.5 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={play}
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={showFullText && currentIndex === -1}
          >
            ▶ Play
          </button>
        )}
      </div>
    );
  };

  if (sequence.length === 0) {
    return (
      <div className={`isl-display ${className}`}>
        <div className="text-center text-slate-500 dark:text-slate-400 py-8">
          {text ? 'No ISL images available for this text' : 'Waiting for announcement...'}
        </div>
      </div>
    );
  }

  return (
    <div className={`isl-display ${className}`}>
      <div className="isl-container bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
        {showFullText ? renderFullText() : renderCurrentItem()}
        {renderProgress()}
        {!autoPlay && renderControls()}
      </div>
    </div>
  );
}

/**
 * ISLDisplaySimple - Simplified version without controls
 * Just shows the sequence automatically
 */
export function ISLDisplaySimple({
  text,
  wordDuration = 2000,
  showFullTextDuration = 3000,
  loop = true,
  className = '',
  imageHeight = '300px',
}) {
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showFullText, setShowFullText] = useState(true);

  useEffect(() => {
    if (text) {
      const seq = textToImageSequence(text);
      setSequence(seq);
      setCurrentIndex(-1);
      setShowFullText(true);
    } else {
      setSequence([]);
      setCurrentIndex(-1);
      setShowFullText(true);
    }
  }, [text]);

  useEffect(() => {
    if (sequence.length === 0) return;

    let timeoutId;

    if (showFullText) {
      timeoutId = setTimeout(() => {
        setShowFullText(false);
        setCurrentIndex(0);
      }, showFullTextDuration);
    } else if (currentIndex < sequence.length) {
      timeoutId = setTimeout(() => {
        if (currentIndex < sequence.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          setTimeout(() => {
            setCurrentIndex(-1);
            setShowFullText(true);
          }, 1000);
        }
      }, wordDuration);
    }

    return () => clearTimeout(timeoutId);
  }, [showFullText, currentIndex, sequence.length, showFullTextDuration, wordDuration, loop]);

  const currentItem = currentIndex >= 0 && currentIndex < sequence.length
    ? sequence[currentIndex]
    : null;

  return (
    <div className={`isl-display-simple ${className}`}>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg min-h-[400px] flex flex-col items-center justify-center">
        {showFullText ? (
          <div className="text-center w-full">
            <p className="text-xl font-medium leading-relaxed whitespace-pre-wrap text-slate-900 dark:text-slate-100">
              {/* {text} */}
            </p>
          </div>
        ) : currentItem ? (
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-center text-slate-700 dark:text-slate-300">
              {currentItem.word}
            </p>
            {currentItem.imagePath ? (
              <img
                src={currentItem.imagePath}
                alt={`ISL: ${currentItem.word}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: imageHeight,
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                No ISL image for: <strong>{currentItem.word}</strong>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-500 dark:text-slate-400">
            Waiting for announcement...
          </div>
        )}

        {/* Progress dots */}
        {sequence.length > 0 && !showFullText && (
          <div className="mt-4 flex gap-1">
            {sequence.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-blue-500 w-6'
                    : idx < currentIndex
                    ? 'bg-green-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}