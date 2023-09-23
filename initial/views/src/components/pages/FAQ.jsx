import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
export default function FAQ() {
  const [openedItems, setOpenedItems] = useState([]);

  const [questions, setQuestions] = useState([
    {
      question: "چگونه می‌توانم ویدیو مورد نظرم را مشاهده کنم؟",
      answer:
        "کافیست لینک ویدیو مد نظرتان را در محل قرار داده شده در صفحه اصلی قرار دهید.",
    },
    {
      question: "چگونه میتوانم ویدیو و یا زیرنویس را دانلود کنم؟",
      answer:
        " پس از قرار دادن لینک ویدیو خود و رفتن به صفحه متناظر آن، بر روی گزینه <span class='text-pink'>دانلود ویدیو</span> و یا <span class='text-purple'> دانلود زیرنویس</span> کلیک نمایید و کیفیت/زبان مورد نظر خود را انتخاب نمایید.",
    },
    {
      question: "این برنامه چگونه برای ویدیو زیرنویس فارسی تولید میکند؟",
      answer:
        "این برنامه در ابتدا با بررسی وجود زیرنویس انگلیسی برای ویدیو در YouTube، آن را دریافت و سپس با استفاده از مترجم فرازین، آن را ترجمه می کند.",
    },
  ]);

  const toggleListItems = (listId) => {
    if (openedItems.includes(listId)) {
      setOpenedItems(openedItems.filter((item) => item !== listId));
    } else {
      setOpenedItems([listId]); // used when only one question can be openned at a time
      //setOpenedItems([...openedItems, listId]); //used when multiple questions can be opened
    }
  };

  const listItemIsOpen = (listId) => {
    return openedItems.includes(listId);
  };

  return (
    <div className="main-body container">
      <div className="d-flex justify-content-center mt-3 text-purple">
        <h2>پرسش‌های متداول</h2>
      </div>
      <div className="mt-5">
        <ul className="list-unstyled">
          {questions.map((question, idx) => (
            <li
              className={`p-4 faq-list-item ${
                listItemIsOpen(idx) ? "active-question" : ""
              }`}
            >
              <div
                className={`d-flex justify-content-between align-items-center flex-grow-1 pointer faq-question-container`}
                onClick={() => toggleListItems(idx)}
              >
                <div className="flex-grow-1">{question.question}</div>
                <div className="d-flex flex-shrink-0">
                  {listItemIsOpen(idx) ? (
                    <FaAngleUp className={"faq-icon"} />
                  ) : (
                    <FaAngleDown className={"faq-icon"} />
                  )}
                </div>
              </div>
              {listItemIsOpen(idx) && (
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: question.answer }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
