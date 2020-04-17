#!/usr/bin/python

import sys
import pandas as pd
import numpy as np
import en_core_web_sm
nlp = en_core_web_sm.load()
from spacy.matcher import PhraseMatcher

resume_content = sys.argv[1]

def create_profile(text):
  text = text.replace("\\n", "")
  text = text.lower()
  
  keyword_dict = pd.read_csv('./python/web_dev.csv')
  skill_words = [nlp(text) for text in keyword_dict['Skills'].dropna(axis = 0)]
  
  matcher = PhraseMatcher(nlp.vocab)
  matcher.add('Skills', None, *skill_words)

  doc = nlp(text)

  skills = []
  matches = matcher(doc)

  for _match_id, start, end in matches:
    span = doc[start : end]
    skills.append(span.text)

  return unique(skills)

def unique(skill_list): 
  x = np.array(skill_list)
  return np.unique(x)

grades = {
  (25, 21): "A",
  (20, 16): "B",
  (15, 11): "C",
  (10, 6): "D"
}

def grade(skill_list):
  score = len(skill_list)

  for boundary in grades:
    if score >= boundary[1]:
      return grades[boundary]

  return "Failed"

skills = create_profile(resume_content)
final_grade = grade(skills)

print(final_grade, end='')
