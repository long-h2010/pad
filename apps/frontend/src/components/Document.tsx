import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface DocProps {
    thumnail: string;
    title: string;
    time: string;
}

const Document: React.FC<DocProps> = () => {
    const [isBubbleOpen, setIsBubbleOpen] = useState(false);

    return (
        <article className='docs-item'>
            <div className='item-thumnail'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDq-v28-P7k7Svx4P9cnXDuL9TNeuOuoZJQg&s' alt="..." /></div>
            <hr style={{ margin: 0 }} />
            <div className="item-body">
                <h6 className="item-title">Tài liệu không có tiêu đề</h6>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <img src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" alt="Icon" className='item-icon' />
                    <p className="item-time">4 thg 6,2024</p>
                    <div style={{ position: "relative" }}>
                        <button style={{ background: "white" }} onClick={() => setIsBubbleOpen(!isBubbleOpen)}><FontAwesomeIcon icon={faEllipsis} className='item-btn' /></button>
                        <div className={`item-options ${isBubbleOpen ? 'open' : ''}`}>
                            <div>Đổi tên</div>
                            <div>Xóa</div>
                            <div>Mở trong thẻ mới</div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Document;
