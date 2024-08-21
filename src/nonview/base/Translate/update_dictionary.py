import json
import os
from utils import Log, File, JSONFile
from deep_translator import GoogleTranslator

log = Log('update_dictionary')

DICTIONARY_PATH = os.path.join('src', 'nonview', 'base', 'Translate', 'DICTIONARY.json')
DICTIONARY_JS_PATH = os.path.join('src', 'nonview', 'base', 'Translate', 'DICTIONARY.js')
TRANSLATE_QUEUE_PATH = os.path.join('src', 'nonview', 'base', 'Translate', 'translate_queue.txt')

def filter_phrases(lines):
    phrases = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('0'):
            continue
        
        words = [word for word in line.split(' ') if not word.startswith('Translate.js')]
        phrase = ' '.join(words)  
        phrases.append(phrase)
    phrases = list(set(phrases))
    phrases.sort()
    return phrases

def get_dictionary():
    return JSONFile(DICTIONARY_PATH).read()

def update_dictionary(dictionary):
    JSONFile(DICTIONARY_PATH).write(dictionary)
    n = len(dictionary)
    log.info(f'Updated DICTIONARY_PATH to {n} phrases')
    
def get_translate_queue():
    lines = File(TRANSLATE_QUEUE_PATH).read_lines()
    phrases = filter_phrases(lines)
    log.info(f'Found {len(phrases)} phrases in TRANSLATE_QUEUE_PATH')
    return phrases

def get_langs():
    return ['si', 'ta']

def get_translator_idx():
    return {lang: GoogleTranslator(source='en', target=lang) for lang in get_langs()}

def build_dictionary_js(d):
    lines = [
        '// Auto-Generated by update_dictionary.py',
        'const DICTIONARY = ' + json.dumps(d, indent=2) + ';',
        '',
        'export default DICTIONARY;'
    ]
    File(DICTIONARY_JS_PATH).write_lines(lines)
    log.info(f'Updated DICTIONARY_JS_PATH')


def empty_translate_queue():
    File(TRANSLATE_QUEUE_PATH).write("")
    log.warning(f'Emptied TRANSLATE_QUEUE_PATH')

def main():
    d = get_dictionary()
    phrases = get_translate_queue()
    translator_idx = get_translator_idx()
    for phrase in phrases:
        if phrase not in d:
            entry = {}
            for lang, translator in translator_idx.items():
                translation = translator.translate(phrase)
                entry[lang] = translation
                log.debug(f'{phrase} -> {translation}')
            d[phrase] = entry
    update_dictionary(d)
    build_dictionary_js(d)
    empty_translate_queue()
    

if __name__ == "__main__":
    main()