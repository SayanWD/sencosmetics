export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <p className="text-muted-foreground mb-8">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="mb-4">
              Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных 
              пользователей веб-сайта Sencosmetics (далее — «Сайт»).
            </p>
            <p>
              Используя Сайт, вы соглашаетесь с условиями настоящей политики конфиденциальности.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Собираемая информация</h2>
            <p className="mb-4">Мы собираем следующую информацию:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Имя и контактные данные (имя, email, телефон)</li>
              <li>Сообщения и запросы, отправленные через форму обратной связи</li>
              <li>Ответы на вопросы опроса для подбора ухода</li>
              <li>Техническая информация (IP-адрес, тип браузера, информация об устройстве)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Цели обработки данных</h2>
            <p className="mb-4">Персональные данные обрабатываются для следующих целей:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Обработка и ответ на ваши запросы</li>
              <li>Предоставление рекомендаций по подбору ухода и продукции Sencosmetics</li>
              <li>Улучшение качества сервиса</li>
              <li>Анализ использования сайта</li>
              <li>Соблюдение требований законодательства</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Хранение и защита данных</h2>
            <p className="mb-4">
              Ваши персональные данные хранятся в защищённой базе данных Supabase и обрабатываются 
              в соответствии с требованиями законодательства о защите персональных данных.
            </p>
            <p>
              Мы применяем технические и организационные меры для защиты ваших персональных данных 
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Передача данных третьим лицам</h2>
            <p className="mb-4">
              Мы не продаём, не обмениваем и не передаём ваши персональные данные третьим лицам, 
              за исключением случаев, когда это необходимо для:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Выполнения ваших запросов</li>
              <li>Соблюдения требований законодательства</li>
              <li>Защиты наших прав и безопасности</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Ваши права</h2>
            <p className="mb-4">Вы имеете право:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Получать информацию о ваших персональных данных</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления ваших персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p>
              Для реализации этих прав свяжитесь с нами по указанным на сайте контактным данным.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Использование cookies</h2>
            <p className="mb-4">
              Наш сайт использует cookies и аналогичные технологии для улучшения работы сайта 
              и анализа его использования. Продолжая использовать сайт, вы соглашаетесь на использование cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Изменения в политике</h2>
            <p>
              Мы можем обновлять настоящую политику конфиденциальности время от времени. 
              Мы уведомим вас о любых изменениях, разместив новую версию политики на этой странице.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Контактная информация</h2>
            <p>
              Если у вас есть вопросы относительно настоящей политики конфиденциальности, 
              пожалуйста, свяжитесь с нами через форму обратной связи на сайте.
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-100 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Важно:</strong> Отправляя любую форму на сайте, вы даёте согласие на обработку 
              ваших персональных данных в соответствии с настоящей политикой конфиденциальности.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
