from playwright.sync_api import sync_playwright
import time

LINKS = [
    'http://lattes.cnpq.br/2896850888776619',
    'http://lattes.cnpq.br/9910460090402916',
    'http://lattes.cnpq.br/7258693512438054',
    'http://lattes.cnpq.br/5592805912091990',
    'http://lattes.cnpq.br/9354778798444061',
    'http://lattes.cnpq.br/0156817167009603',
    'http://lattes.cnpq.br/5368368699798711',
    'http://lattes.cnpq.br/7353087112070433',
    'http://lattes.cnpq.br/5394591294622968',
    'http://lattes.cnpq.br/7955383731847589',
    'http://lattes.cnpq.br/6072591518060376',
    'http://lattes.cnpq.br/2704540669332324',
    'http://lattes.cnpq.br/9196376338221462',
    'http://lattes.cnpq.br/3332088975086202',
    'http://lattes.cnpq.br/4447935676139776',
    'http://lattes.cnpq.br/8946741255015096',
    'http://lattes.cnpq.br/6897242450860951',
    'http://lattes.cnpq.br/3278209859653249',
    'http://lattes.cnpq.br/5106317322513827',
    'http://lattes.cnpq.br/2606617037551270',
    'http://lattes.cnpq.br/8088461024749919',
    'http://lattes.cnpq.br/9071463080240819',
    'http://lattes.cnpq.br/2339710145228308',
    'http://lattes.cnpq.br/0137204948070733',
    'http://lattes.cnpq.br/0917092323738457',
    'http://lattes.cnpq.br/2001123342777874',
    'http://lattes.cnpq.br/0322712366911621',
    'http://lattes.cnpq.br/8165616867408082',
    'http://lattes.cnpq.br/8390762794908585',
    'http://lattes.cnpq.br/6003990795921040',
    'http://lattes.cnpq.br/9876336514531357',
    'http://lattes.cnpq.br/3972633128640965',
    'http://lattes.cnpq.br/9662875113651503',
    'http://lattes.cnpq.br/5364387869010471',
    'http://lattes.cnpq.br/1088212695829506',
    'http://lattes.cnpq.br/2801594081219451',
    'http://lattes.cnpq.br/3083750278254592',
    'http://lattes.cnpq.br/7569291799926573',
    'http://lattes.cnpq.br/2905730630984653',
    'http://lattes.cnpq.br/1598677264477335',
    'http://lattes.cnpq.br/5726047707894583',
    'http://lattes.cnpq.br/4498824812684000',
    'http://lattes.cnpq.br/5063104922565921',
    'http://lattes.cnpq.br/3443182824878866',
    'http://lattes.cnpq.br/2539410198240163',
    'http://lattes.cnpq.br/4633002288019460',
    'http://lattes.cnpq.br/3905473334894442',
    'http://lattes.cnpq.br/5220477053711608',
    'http://lattes.cnpq.br/5647518666766098',
    'http://lattes.cnpq.br/4877420955045703',
    'http://lattes.cnpq.br/2351905355694162',
    'http://lattes.cnpq.br/8589666863624180',
    'http://lattes.cnpq.br/0461164325523457',
    'http://lattes.cnpq.br/8325100287493334',
    'http://lattes.cnpq.br/8010842851679096',
    'http://lattes.cnpq.br/6649796144129435',
    'http://lattes.cnpq.br/3548835386841697',
    'http://lattes.cnpq.br/2961411469597684',
    'http://lattes.cnpq.br/9782304564156617',
    'http://lattes.cnpq.br/8596331354732612',
    'http://lattes.cnpq.br/4638688296783606',
    'http://lattes.cnpq.br/4770016544453387',
    'http://lattes.cnpq.br/8499007638180773',
    'http://lattes.cnpq.br/1107888000348488',
    'http://lattes.cnpq.br/1760650391519685',
    'http://lattes.cnpq.br/0366317443486562',
    'http://lattes.cnpq.br/5483359917410124',
    'http://lattes.cnpq.br/7188455863790975',
    'http://lattes.cnpq.br/6598661324633248',
    'http://lattes.cnpq.br/3260574678457547',
    'http://lattes.cnpq.br/4935825920838794',
    'http://lattes.cnpq.br/1016795045258728',
    'http://lattes.cnpq.br/4935340781738514',
    'http://lattes.cnpq.br/3915354229971189',
    'http://lattes.cnpq.br/9998871144343150',
    'http://lattes.cnpq.br/4507944299087617',
    'http://lattes.cnpq.br/8520915740121883',
    'http://lattes.cnpq.br/0063865672120826',
    'http://lattes.cnpq.br/2513523808365384',
    'http://lattes.cnpq.br/7578517961831178',
    'http://lattes.cnpq.br/8191727568242471',
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    resultados = []
    
    for i, link in enumerate(LINKS):
        print(f'[{i+1}/{len(LINKS)}] {link}')
        try:
            page.goto(link, wait_until='networkidle')
            page.wait_for_timeout(4000)
            
            nome = 'NAO_ENCONTRADO'
            
            # Tenta varios seletores
            seletores = [
                'h2.nome',
                '.nome-completo', 
                '#nomeCompleto',
                'span.nome',
                'div.nome',
                'h1',
                'title'
            ]
            
            for sel in seletores:
                elem = page.query_selector(sel)
                if elem:
                    texto = elem.inner_text().strip()
                    if texto and len(texto) > 3 and 'Lattes' not in texto:
                        nome = texto
                        break
            
            # Se nao achou, pega do title
            if nome == 'NAO_ENCONTRADO':
                titulo = page.title()
                if titulo:
                    nome = titulo.replace('Currículo do Sistema de Currículos Lattes', '').replace('(', '').replace(')', '').strip()
            
            print(f'  → {nome}')
            resultados.append(f'{nome} | {link}')
            
        except Exception as e:
            print(f'  ERRO: {e}')
            resultados.append(f'ERRO | {link}')
        
        time.sleep(1)
    
    browser.close()

# Salva
with open('lattes_final.txt', 'w', encoding='utf-8') as f:
    f.write('MAPEAMENTO LATTES - IFSP CUBATAO\n')
    f.write('=' * 70 + '\n')
    f.write('Nome | Link\n')
    f.write('-' * 70 + '\n')
    for r in resultados:
        f.write(r + '\n')

print('\n\n✓ SALVO EM: lattes_final.txt')
