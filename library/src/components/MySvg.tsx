    import React from 'react';
    import { Pencil, Trash2 } from 'lucide-react';

    interface SVGComponentProps {
    color: string;
    name: string;
    onEdit: () => void;
    onDelete: () => void;
    isSelected: boolean;
    }

    const SVGComponent: React.FC<SVGComponentProps> = ({ color, name, onEdit, onDelete, isSelected }) => {
    const getTextColor = (bgColor: string) => {
        const hexColor = bgColor.replace("#", "");
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000' : '#FFF';
    };

    const buttonStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        padding: 0,
        margin: '0 5px',
        backgroundColor: '#fff'
    };

    return (
        <div className="position-relative" style={{backgroundImage: 'linear-gradient(to top, #9b6c5b 39%, transparent 39%)'}}>
            <div className=''></div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
            maxHeight: '500px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            transform: isSelected ? 'rotate(-10deg) translate(-20px, 20px)' : 'none',
            transformOrigin: 'bottom right',
            }}
            width="73.728"
            height="259.74"
        >
            <defs>
                <pattern id="bookTexture" patternUnits="userSpaceOnUse" width="8" height="8">
                <path d="M0,8 L8,0" stroke={getTextColor(color)} strokeWidth="0.5" />
                <path d="M-4,4 L4,-4" stroke={getTextColor(color)} strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect stroke="none" fill="none" y="0" x="0" height="100%" width="100%" />
            <g className="currentLayer">
                <path style={{ color: "#000" }} d="m11.368 40.194 23.31 2.548L65.322 3.226H38.71z" fill="#fff" />
                <path style={{ color: "#000" }} d="M36.758-.11 3.226 35.135l1.632 218.04 6.527 3.266 26.926.817 34.27-79.213L69.317-1.613 37.495 44.118c.079.686-28.48-5.03-28.48-5.03S40.838 3.156 36.759-.11" fill={color} />
                <path style={{ color: "#000" }} d="M36.758-.11 3.226 35.135l1.632 218.04 6.527 3.266 26.926.817 34.27-79.213L69.317-1.613 37.495 44.118c.079.686-28.48-5.03-28.48-5.03S40.838 3.156 36.759-.11" fill="url(#bookTexture)" opacity="0.3" />
                <foreignObject
                fill={getTextColor(color)}
                fillRule="nonzero"
                fontSize={6}
                fontFamily="Roboto"
                letterSpacing={1}
                wordSpacing={18}
                x={2.571}
                y={51}
                width={32}
                height={67}
                style={{
                    color: getTextColor(color),
                    textAlign: "center",
                    lineHeight: 33,
                }}
                transform="rotate(.861 21.857 135.5)"
                fontWeight="bold"
                >
                <p style={{
                    border: 0,
                    outline: 0,
                    fontSize: "inherit",
                    lineHeight: "1em",
                    padding: 0,
                    margin: 0,
                }}>
                    {name}
                </p>
                </foreignObject>
                <foreignObject
            
                fill={getTextColor(color)}
                fillRule="nonzero"
                fontSize={6}
                fontFamily="Roboto"
                letterSpacing={1}
                wordSpacing={18}
                x={37}
                y={120}
                width={32}
                height={67}
                style={{
                    color: getTextColor(color),
                    textAlign: "center",
                    lineHeight: 33,
                }}
                transform="rotate(.861 21.857 135.5) skewY(-55)"
                fontWeight="bold"
                >
                <p style={{
                    border: 0,
                    outline: 0,
                    fontSize: "inherit",
                    lineHeight: "1em",
                    padding: 0,
                    margin: 0,
                }}>
                    {name}
                </p>
                </foreignObject>
            
            </g>

            <path
                d="M648.839 5863.129c-18-23-26-25-136-30-109-4-118-3-118 14 0 25-14 31-43 18-22-10-320-330-340-365-5-8-4-362 2-787s12-908 12-1073c2-272 4-304 20-325 18-24 21-24 185-24h167l99 235c54 129 119 285 144 345 25 61 54 124 64 142 11 18 22 48 25 67 4 19 2 313-5 653-6 340-13 737-13 883-2 262-2 265-23 268-14 2-29-6-40-21m-284-37c0-5-66-89-146-186s-142-180-137-184c14-14 122-30 197-30h71l-6-147c-4-82-7-557-8-1056l-1-909-125 4c-80 2-128 7-136 15-9 9-16 269-26 1079-12 1009-12 1068 5 1090 32 43 297 333 305 333 4 1 7-3 7-9m317-237c-1-131 2-522 7-869l9-631-51-114c-27-63-83-193-123-289-135-326-146-350-152-357-10-9-8 1720 2 1938l8 176 144 191c79 105 147 192 151 192 3 0 6-107 5-237m-74 205c-6-7-61-80-123-163-62-82-120-156-128-162-24-20-237-12-230 7 2 5 61 78 132 164 144 173 123 161 280 164 61 2 76-1 69-10"
                fill="#000"
                transform="matrix(.1 0 0 -.1 0 585)"
            />
                </svg>

            <div 
            style={{
                transform: 'translate(-50%, -50%)',
                zIndex: 10
            }}
            className={`position-absolute d-flex align-items-center justify-content-center fade-in ${isSelected ? 'show' : ''}`}
            >
            <button
                onClick={(e) => {
                e.stopPropagation();
                onEdit();
                }}
                className="btn btn-light float-button"
                style={buttonStyle}
            >
                <Pencil size={16} color="#0d6efd" />
            </button>
            <button
                onClick={(e) => {
                e.stopPropagation();
                onDelete();
                }}
                className="btn btn-light float-button"
                style={buttonStyle}
            >
                <Trash2 size={16} color="#dc3545" />
            </button>
            </div>
    
        </div>
    );
    };

    export default SVGComponent;