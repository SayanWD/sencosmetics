'use client'

import { useEffect } from 'react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 left-full -translate-x-12 mr-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Закрыть"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold mb-4">Политика конфиденциальности</h1>
          
          <p className="text-muted-foreground mb-8">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p className="mb-3">
                Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей веб-сайта Sencosmetics (далее — «Сайт»).
              </p>
              <p>
                Используя Сайт, вы соглашаетесь с условиями настоящей политики конфиденциальности.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Собираемая информация</h2>
              <p className="mb-3">Мы собираем следующую информацию:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Имя и контактные данные (имя, email, телефон)</li>
                <li>Сообщения и запросы, отправленные через форму обратной связи</li>
                <li>Ответы на вопросы опроса для подбора ухода</li>
                <li>Техническая информация (IP-адрес, тип браузера, информация об устройстве)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Цели обработки данных</h2>
              <p className="mb-3">Персональные данные обрабатываются для следующих целей:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Обработка и ответ на ваши запросы</li>
                <li>Предоставление рекомендаций по подбору ухода и продукции Sencosmetics</li>
                <li>Улучшение качества сервиса</li>
                <li>Анализ использования сайта</li>
                <li>Соблюдение требований законодательства</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Хранение и защита данных</h2>
              <p className="mb-3">
                Ваши персональные данные хранятся в защищённой базе данных Supabase и обрабатываются 
                в соответствии с требованиями законодательства о защите персональных данных.
              </p>
              <p>
                Мы применяем технические и организационные меры для защиты ваших персональных данных 
                от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Передача данных третьим лицам</h2>
              <p className="mb-3">
                Мы не продаём, не обмениваем и не передаём ваши персональные данные третьим лицам, 
                за исключением случаев, когда это необходимо для:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Выполнения ваших запросов</li>
                <li>Соблюдения требований законодательства</li>
                <li>Защиты наших прав и безопасности</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Ваши права</h2>
              <p className="mb-3">Вы имеете право:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Получать информацию о ваших персональных данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
              </ul>
              <p>
                Для реализации этих прав свяжитесь с нами по указанным на сайте контактным данным.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Использование cookies</h2>
              <p>
                Наш сайт использует cookies и аналогичные технологии для улучшения работы сайта 
                и анализа его использования. Продолжая использовать сайт, вы соглашаетесь на использование cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Изменения в политике</h2>
              <p>
                Мы можем обновлять настоящую политику конфиденциальности время от времени. 
                Мы уведомим вас о любых изменениях, разместив новую версию политики на этой странице.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Контактная информация</h2>
              <p>
                Если у вас есть вопросы относительно настоящей политики конфиденциальности, 
                пожалуйста, свяжитесь с нами через форму обратной связи на сайте.
              </p>
            </section>

            <div className="mt-8 p-4 bg-slate-100 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Важно:</strong> Отправляя любую форму на сайте, вы даёте согласие на обработку 
                ваших персональных данных в соответствии с настоящей политикой конфиденциальности.
              </p>
            </div>
          </div>

          {/* Close button at bottom */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
