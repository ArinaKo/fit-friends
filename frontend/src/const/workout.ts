export enum WorkoutType {
  Yoga = 'йога',
  Running = 'бег',
  Box = 'бокс',
  Stretching = 'стрейчинг',
  Crossfit = 'кроссфит',
  Aerobic = 'аэробика',
  Pilates = 'пилатес',
  Strength = 'силовые',
}

export enum WorkoutDuration {
  Short = '10-30',
  Medium = '30-50',
  Long = '50-80',
  Extra = '80-100',
}

export enum WorkoutSexFor {
  Male = 'мужчинам',
  Female = 'женщинам',
  All = 'всем',
}

export enum WorkoutTitleLength {
  Min = 1,
  Max = 15,
}

export enum WorkoutDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum PriceValue {
  Min = 0,
  Max = 50000,
}

export enum RatingValue {
  Default = 0,
  Min = 1,
  Max = 5,
}

export enum CommentTextLength {
  Min = 10,
  Max = 140,
}
