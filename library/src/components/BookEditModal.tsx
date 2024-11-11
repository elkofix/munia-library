import React, { useEffect, useRef, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

interface BookEditModalProps {
  show: boolean;
  onHide: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  color?: string;
}

const BookEditModal: React.FC<BookEditModalProps> = ({
  show,
  onHide,
  value,
  onChange,
  onConfirm,
  color = '#0000ff'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTextColor = (bgColor: string): string => {
    const hexColor = bgColor.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000' : '#FFF';
  };

  const getDarkerColor = (baseColor: string): string => {
    const hexColor = baseColor.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const darkerR = Math.max(0, r - 30);
    const darkerG = Math.max(0, g - 30);
    const darkerB = Math.max(0, b - 30);
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [show, onHide]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onConfirm();
    } else if (e.key === 'Escape') {
      onHide();
    }
  };

  if (!show) return null;

  const textColor = getTextColor(color);
  const spineColor = getDarkerColor(color);

  return createPortal(
    <div

      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div
        ref={modalRef}
        style={{
          perspective: '1000px',
          animation: 'slideUp 0.4s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: 0,
            width: '40px',
            height: '400px',
            backgroundColor: spineColor,
            transform: 'rotateY(0deg) translateZ(-20px)',
            borderRadius: '0 6px 6px 0',
            border: '5px solid black',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.3,
              backgroundImage: `repeating-linear-gradient(45deg, ${textColor} 0, ${textColor} 1px, transparent 0, transparent 50%)`,
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        <div className='d-flex p-4 '
          style={{
            backgroundColor: color,
            backgroundImage: `repeating-linear-gradient(45deg, ${color} .5px, ${textColor} 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px',
            transform: 'rotateY(-10deg)',
            width: '300px',
            height: '400px',
            border: '6px solid black',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${textColor} 0, ${textColor} 1px, transparent 0, transparent 50%)`,
              backgroundSize: '8px 8px',
              borderRadius: '10px'
            }}
          />

          <div className='d-flex flex-column'
            onClick={e => e.stopPropagation()}
          >
            <div className='d-flex flex-column align-items-center'>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textColor,
                  caretColor: textColor,
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}
                placeholder="Escribir título..."
              />
              <div
                style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  opacity: 0.75,
                  color: textColor
                }}
              >
                Presiona Enter para guardar
              </div>
            </div>


            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-primary mr-2"
                onClick={onConfirm}
              >
                Confirmar
              </button>
              <button
                className="btn btn-outline-light"
                onClick={onHide}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(50px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes blink {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
            }

            .blinking-cursor {
              caret-color: transparent;
              position: relative;
            }

            .blinking-cursor::after {
              content: '';
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 2px;
              height: 1.2em;
              background-color: currentColor;
              animation: blink 1s step-end infinite;
              margin-left: 2px;
            }

            .blinking-cursor:focus::after {
              display: none;
            }
          `}
        </style>
      </div>
    </div>,
    document.body
  );
};

export default BookEditModal;
