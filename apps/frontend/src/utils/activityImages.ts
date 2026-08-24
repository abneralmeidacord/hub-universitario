import type { ActivityCategory } from '../types/activity'

export const categoryImages: Record<ActivityCategory, string> = {
  WORKSHOP: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=format&fit=crop&w=900&q=82',
  LECTURE: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=format&fit=crop&w=900&q=82',
  COURSE: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=format&fit=crop&w=900&q=82',
  EXTENSION_PROJECT: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=format&fit=crop&w=900&q=82',
  EVENT: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=format&fit=crop&w=900&q=82',
}

export const activityImages: Record<string, string> = {
  'Comunicação e Oratória': 'https://images.pexels.com/photos/15920138/pexels-photo-15920138.jpeg?auto=format&fit=crop&w=900&q=82',
  'Python para Análise de Dados': 'https://images.pexels.com/photos/31177212/pexels-photo-31177212.jpeg?auto=format&fit=crop&w=900&q=82',
  'Clínica de Orientação Profissional': 'https://images.pexels.com/photos/2646530/pexels-photo-2646530.jpeg?auto=format&fit=crop&w=900&q=82',
  'Direitos Humanos e Universidade': 'https://images.pexels.com/photos/12442338/pexels-photo-12442338.jpeg?auto=format&fit=crop&w=900&q=82',
  'Semana de Tecnologia 2026': 'https://images.pexels.com/photos/8728556/pexels-photo-8728556.jpeg?auto=format&fit=crop&w=900&q=82',
  'Mostra de Cinema Brasileiro': 'https://images.pexels.com/photos/7991266/pexels-photo-7991266.jpeg?auto=format&fit=crop&w=900&q=82',
  'Escrita Acadêmica': 'https://images.pexels.com/photos/8518990/pexels-photo-8518990.jpeg?auto=format&fit=crop&w=900&q=82',
  'Feira de Estágios': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=format&fit=crop&w=900&q=82',
  'Introdução à Inteligência Artificial': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=format&fit=crop&w=900&q=82',
  'Horta Comunitária do Campus': 'https://images.pexels.com/photos/6508397/pexels-photo-6508397.jpeg?auto=format&fit=crop&w=900&q=82',
}

export function getActivityImage(title: string, category: ActivityCategory) {
  return activityImages[title] ?? categoryImages[category]
}
