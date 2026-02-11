from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    page.goto('http://lattes.cnpq.br/2896850888776619')
    page.wait_for_timeout(10000)
    
    # Salva o HTML pra analisar
    html = page.content()
    with open('pagina_lattes.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Tira screenshot
    page.screenshot(path='screenshot_lattes.png', full_page=True)
    
    print('HTML salvo em: pagina_lattes.html')
    print('Screenshot salvo em: screenshot_lattes.png')
    
    # Mantem aberto pra voce ver
    input('Pressione ENTER pra fechar...')
    browser.close()
