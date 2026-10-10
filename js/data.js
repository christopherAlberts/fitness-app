// Exercise and Program Data
// Exercise images from wger.de (CC-BY-SA) with attribution

const EXERCISES = [
  // Upper Body - Chest
  {
    id: 'pushup',
    name: 'Push-up',
    category: 'upper',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    image: null,
    steps: [
      'Start in a plank position with hands slightly wider than shoulder-width',
      'Keep your body in a straight line from head to heels',
      'Lower your chest toward the floor by bending your elbows',
      'Push back up to the starting position'
    ],
    cues: [
      'Engage your core throughout the movement',
      'Keep elbows at 45-degree angle from body',
      'Full range of motion - chest near floor'
    ],
    mistakes: [
      'Letting hips sag or pike up',
      'Flaring elbows out to 90 degrees',
      'Not going through full range of motion'
    ]
  },
  {
    id: 'bench_press',
    name: 'Bench Press',
    category: 'upper',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    image: null,
    steps: [
      'Lie on bench with feet flat on floor',
      'Grip bar slightly wider than shoulder-width',
      'Unrack and lower bar to mid-chest',
      'Press bar up until arms are extended'
    ],
    cues: [
      'Retract shoulder blades and arch upper back slightly',
      'Keep wrists straight over elbows',
      'Drive feet into floor for stability'
    ],
    mistakes: [
      'Bouncing bar off chest',
      'Lifting hips off bench',
      'Flaring elbows excessively'
    ]
  },
  {
    id: 'dumbbell_row',
    name: 'Dumbbell Row',
    category: 'upper',
    muscles: ['Back', 'Biceps', 'Rear Delts'],
    image: null,
    steps: [
      'Place one knee and hand on bench, other foot on floor',
      'Hold dumbbell in free hand, arm extended',
      'Pull dumbbell to hip, squeezing shoulder blade',
      'Lower with control and repeat'
    ],
    cues: [
      'Keep back flat and parallel to floor',
      'Pull elbow past torso',
      'Minimize body rotation'
    ],
    mistakes: [
      'Using momentum to swing weight',
      'Rounding the back',
      'Shrugging shoulder up'
    ]
  },
  {
    id: 'overhead_press',
    name: 'Overhead Press',
    category: 'upper',
    muscles: ['Shoulders', 'Triceps', 'Upper Chest'],
    image: null,
    steps: [
      'Stand with feet shoulder-width apart, bar at shoulder level',
      'Grip bar just outside shoulders',
      'Press bar overhead until arms are locked',
      'Lower bar back to shoulders with control'
    ],
    cues: [
      'Brace core and squeeze glutes',
      'Push head through as bar passes face',
      'Lock out with bar over mid-foot'
    ],
    mistakes: [
      'Excessive lower back arch',
      'Pressing bar forward instead of straight up',
      'Not fully locking out overhead'
    ]
  },
  {
    id: 'pull_up',
    name: 'Pull-up',
    category: 'upper',
    muscles: ['Back', 'Biceps', 'Core'],
    image: null,
    steps: [
      'Hang from bar with palms facing away, hands shoulder-width apart',
      'Engage core and squeeze shoulder blades together',
      'Pull yourself up until chin clears the bar',
      'Lower with control to full arm extension'
    ],
    cues: [
      'Initiate pull by depressing shoulder blades',
      'Drive elbows down and back',
      'Keep core tight to prevent swinging'
    ],
    mistakes: [
      'Using momentum or kipping',
      'Not going through full range of motion',
      'Craning neck to get chin over bar'
    ]
  },
  {
    id: 'bicep_curl',
    name: 'Bicep Curl',
    category: 'upper',
    muscles: ['Biceps', 'Forearms'],
    image: null,
    steps: [
      'Stand holding dumbbells at sides, palms forward',
      'Keep elbows close to torso',
      'Curl weights up toward shoulders',
      'Lower with control'
    ],
    cues: [
      'Keep upper arms stationary',
      'Squeeze biceps at the top',
      'Control the negative portion'
    ],
    mistakes: [
      'Swinging weights or using momentum',
      'Moving elbows forward',
      'Leaning back to lift heavier weight'
    ]
  },
  {
    id: 'tricep_dip',
    name: 'Tricep Dip',
    category: 'upper',
    muscles: ['Triceps', 'Chest', 'Shoulders'],
    image: null,
    steps: [
      'Grip parallel bars and lift yourself up with arms extended',
      'Keep elbows close to body',
      'Lower until upper arms are parallel to floor',
      'Push back up to starting position'
    ],
    cues: [
      'Lean slightly forward for more chest activation',
      'Keep shoulders down and back',
      'Control the descent'
    ],
    mistakes: [
      'Dropping too fast',
      'Flaring elbows out wide',
      'Going too deep and stressing shoulders'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    muscles: ['Core', 'Shoulders', 'Glutes'],
    image: null,
    steps: [
      'Start in forearm plank position',
      'Elbows directly under shoulders',
      'Keep body in straight line from head to heels',
      'Hold position while breathing normally'
    ],
    cues: [
      'Engage core by pulling belly button to spine',
      'Squeeze glutes',
      'Keep neck neutral, looking at floor'
    ],
    mistakes: [
      'Letting hips drop or pike up',
      'Holding breath',
      'Looking up and straining neck'
    ]
  },
  // Lower Body
  {
    id: 'squat',
    name: 'Barbell Squat',
    category: 'lower',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    image: null,
    steps: [
      'Position bar on upper back, feet shoulder-width apart',
      'Brace core and begin descent by pushing hips back',
      'Descend until thighs are parallel to floor or below',
      'Drive through feet to stand back up'
    ],
    cues: [
      'Keep chest up and back straight',
      'Knees track over toes',
      'Weight distributed across whole foot'
    ],
    mistakes: [
      'Knees caving inward',
      'Rising onto toes',
      'Excessive forward lean'
    ]
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'lower',
    muscles: ['Hamstrings', 'Glutes', 'Back', 'Core'],
    image: null,
    steps: [
      'Stand with feet hip-width, bar over mid-foot',
      'Hinge at hips, grip bar just outside legs',
      'Brace core, flatten back, drive through floor',
      'Stand tall, then lower bar with control'
    ],
    cues: [
      'Push floor away rather than pulling bar up',
      'Keep bar close to body throughout',
      'Lock out with glutes, not by leaning back'
    ],
    mistakes: [
      'Rounding the lower back',
      'Starting with hips too high or low',
      'Letting bar drift away from body'
    ]
  },
  {
    id: 'lunge',
    name: 'Walking Lunge',
    category: 'lower',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    image: null,
    steps: [
      'Stand tall with feet together',
      'Step forward into a lunge position',
      'Lower back knee toward floor',
      'Push through front foot to step forward'
    ],
    cues: [
      'Keep torso upright',
      'Front knee tracks over ankle',
      'Controlled descent and push-off'
    ],
    mistakes: [
      'Front knee extending past toes',
      'Leaning too far forward',
      'Losing balance - use shorter steps'
    ]
  },
  {
    id: 'romanian_deadlift',
    name: 'Romanian Deadlift',
    category: 'lower',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    image: null,
    steps: [
      'Hold bar or dumbbells at hip level',
      'Push hips back while keeping slight knee bend',
      'Lower weight along legs until hamstring stretch',
      'Drive hips forward to return to standing'
    ],
    cues: [
      'Keep back flat throughout',
      'Feel stretch in hamstrings',
      'Weight stays close to legs'
    ],
    mistakes: [
      'Rounding the back',
      'Bending knees too much (making it a squat)',
      'Not pushing hips back far enough'
    ]
  },
  {
    id: 'leg_press',
    name: 'Leg Press',
    category: 'lower',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    image: null,
    steps: [
      'Sit in machine with back flat against pad',
      'Place feet shoulder-width on platform',
      'Release safety and lower platform',
      'Press through feet to extend legs'
    ],
    cues: [
      'Keep lower back pressed into pad',
      'Don\'t lock out knees completely',
      'Control the negative portion'
    ],
    mistakes: [
      'Letting lower back round off pad',
      'Placing feet too high or low',
      'Bouncing at the bottom'
    ]
  },
  {
    id: 'calf_raise',
    name: 'Calf Raise',
    category: 'lower',
    muscles: ['Calves'],
    image: null,
    steps: [
      'Stand on edge of step with heels hanging off',
      'Hold wall or rail for balance',
      'Rise up onto toes as high as possible',
      'Lower heels below step level'
    ],
    cues: [
      'Full range of motion - stretch and squeeze',
      'Pause at the top',
      'Control the descent'
    ],
    mistakes: [
      'Bouncing instead of controlled reps',
      'Not going through full range',
      'Bending knees during movement'
    ]
  },
  {
    id: 'glute_bridge',
    name: 'Glute Bridge',
    category: 'lower',
    muscles: ['Glutes', 'Hamstrings', 'Core'],
    image: null,
    steps: [
      'Lie on back with knees bent, feet flat',
      'Arms at sides, palms down',
      'Drive through heels to lift hips',
      'Squeeze glutes at top, lower with control'
    ],
    cues: [
      'Keep core engaged throughout',
      'Don\'t hyperextend lower back',
      'Squeeze glutes hard at the top'
    ],
    mistakes: [
      'Arching lower back excessively',
      'Pushing through toes instead of heels',
      'Not squeezing glutes at top'
    ]
  },
  // Core
  {
    id: 'dead_bug',
    name: 'Dead Bug',
    category: 'core',
    muscles: ['Core', 'Hip Flexors'],
    image: null,
    steps: [
      'Lie on back with arms extended to ceiling',
      'Lift legs with knees at 90 degrees',
      'Lower opposite arm and leg toward floor',
      'Return and repeat on other side'
    ],
    cues: [
      'Press lower back into floor',
      'Move slowly and controlled',
      'Exhale as you extend'
    ],
    mistakes: [
      'Letting lower back arch off floor',
      'Moving too quickly',
      'Holding breath'
    ]
  },
  {
    id: 'russian_twist',
    name: 'Russian Twist',
    category: 'core',
    muscles: ['Obliques', 'Core'],
    image: null,
    steps: [
      'Sit with knees bent, lean back slightly',
      'Hold weight at chest or clasp hands',
      'Rotate torso to touch floor beside hip',
      'Rotate to other side'
    ],
    cues: [
      'Keep chest lifted',
      'Rotate from core, not just arms',
      'Control the movement'
    ],
    mistakes: [
      'Rounding the back',
      'Moving arms without rotating torso',
      'Going too fast'
    ]
  },
  {
    id: 'mountain_climber',
    name: 'Mountain Climber',
    category: 'cardio',
    muscles: ['Core', 'Hip Flexors', 'Shoulders'],
    image: null,
    steps: [
      'Start in push-up position',
      'Drive one knee toward chest',
      'Quickly switch legs',
      'Continue alternating at desired pace'
    ],
    cues: [
      'Keep hips level, don\'t pike up',
      'Hands under shoulders',
      'Core engaged throughout'
    ],
    mistakes: [
      'Bouncing hips up and down',
      'Not bringing knees far enough forward',
      'Letting form break down when tired'
    ]
  },
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'cardio',
    muscles: ['Full Body'],
    image: null,
    steps: [
      'Stand with feet shoulder-width apart',
      'Squat down and place hands on floor',
      'Jump feet back to plank, do a push-up',
      'Jump feet to hands, explode up with jump'
    ],
    cues: [
      'Land softly on each jump',
      'Maintain good push-up form',
      'Keep core engaged throughout'
    ],
    mistakes: [
      'Skipping the push-up',
      'Not fully extending on jump',
      'Letting hips sag in plank'
    ]
  },
  // Stretches
  {
    id: 'hip_flexor_stretch',
    name: 'Hip Flexor Stretch',
    category: 'stretch',
    muscles: ['Hip Flexors', 'Quadriceps'],
    image: null,
    steps: [
      'Kneel on one knee, other foot forward',
      'Keep torso upright',
      'Gently push hips forward',
      'Hold for 30-60 seconds, switch sides'
    ],
    cues: [
      'Tuck pelvis slightly',
      'Keep front knee over ankle',
      'Breathe deeply into the stretch'
    ],
    mistakes: [
      'Arching lower back',
      'Leaning forward',
      'Rushing the stretch'
    ]
  },
  {
    id: 'pigeon_pose',
    name: 'Pigeon Pose',
    category: 'stretch',
    muscles: ['Glutes', 'Hip Rotators'],
    image: null,
    steps: [
      'From hands and knees, bring one knee forward',
      'Slide other leg back, keeping hips square',
      'Lower torso over front leg',
      'Hold for 1-2 minutes, switch sides'
    ],
    cues: [
      'Keep hips level and square',
      'Relax into the stretch',
      'Use props under hip if needed'
    ],
    mistakes: [
      'Letting hips twist to one side',
      'Forcing too deep too fast',
      'Holding breath'
    ]
  },
  {
    id: 'hamstring_stretch',
    name: 'Standing Hamstring Stretch',
    category: 'stretch',
    muscles: ['Hamstrings', 'Calves'],
    image: null,
    steps: [
      'Stand and place one heel on low surface',
      'Keep leg straight, toes pointed up',
      'Hinge at hips and lean forward',
      'Hold for 30-60 seconds, switch sides'
    ],
    cues: [
      'Keep back flat, don\'t round',
      'Lead with chest, not head',
      'Feel stretch behind thigh'
    ],
    mistakes: [
      'Rounding the back',
      'Bending the knee',
      'Bouncing'
    ]
  },
  {
    id: 'quad_stretch',
    name: 'Standing Quad Stretch',
    category: 'stretch',
    muscles: ['Quadriceps', 'Hip Flexors'],
    image: null,
    steps: [
      'Stand on one leg, hold wall for balance',
      'Grab opposite ankle behind you',
      'Pull heel toward glute',
      'Hold for 30-60 seconds, switch sides'
    ],
    cues: [
      'Keep knees together',
      'Stand tall, don\'t lean forward',
      'Tuck pelvis slightly for deeper stretch'
    ],
    mistakes: [
      'Arching lower back',
      'Letting knee flare out',
      'Leaning too far forward'
    ]
  },
  {
    id: 'calf_stretch',
    name: 'Calf Stretch',
    category: 'stretch',
    muscles: ['Calves', 'Achilles'],
    image: null,
    steps: [
      'Stand facing wall, hands on wall',
      'Step one foot back, keeping heel down',
      'Lean into wall, keeping back leg straight',
      'Hold for 30-60 seconds, switch sides'
    ],
    cues: [
      'Keep back heel pressed into floor',
      'Point toes straight ahead',
      'Lean forward from ankle, not waist'
    ],
    mistakes: [
      'Lifting back heel',
      'Bending back knee',
      'Turning foot out'
    ]
  },
  {
    id: 'shoulder_stretch',
    name: 'Cross-Body Shoulder Stretch',
    category: 'stretch',
    muscles: ['Shoulders', 'Upper Back'],
    image: null,
    steps: [
      'Bring one arm across chest',
      'Use other hand to pull arm closer',
      'Keep shoulder down, not shrugged',
      'Hold for 30 seconds, switch sides'
    ],
    cues: [
      'Keep shoulder relaxed and down',
      'Feel stretch in back of shoulder',
      'Don\'t twist torso'
    ],
    mistakes: [
      'Shrugging shoulder up',
      'Pulling too aggressively',
      'Twisting body'
    ]
  },
  {
    id: 'chest_stretch',
    name: 'Doorway Chest Stretch',
    category: 'stretch',
    muscles: ['Chest', 'Shoulders'],
    image: null,
    steps: [
      'Stand in doorway, forearm on frame',
      'Elbow at shoulder height',
      'Step through doorway slightly',
      'Hold for 30 seconds, switch sides'
    ],
    cues: [
      'Keep core engaged',
      'Don\'t arch lower back',
      'Feel stretch across chest'
    ],
    mistakes: [
      'Arching lower back',
      'Shrugging shoulder',
      'Leaning too aggressively'
    ]
  },
  {
    id: 'cat_cow',
    name: 'Cat-Cow Stretch',
    category: 'stretch',
    muscles: ['Spine', 'Core', 'Shoulders'],
    image: null,
    steps: [
      'Start on hands and knees',
      'Inhale, drop belly, lift head (Cow)',
      'Exhale, round spine, tuck chin (Cat)',
      'Flow between positions with breath'
    ],
    cues: [
      'Move slowly with breath',
      'Feel each vertebra articulate',
      'Keep arms straight'
    ],
    mistakes: [
      'Moving too quickly',
      'Not coordinating with breath',
      'Only moving from lower back'
    ]
  },
  {
    id: 'ankle_circles',
    name: 'Ankle Circles',
    category: 'stretch',
    muscles: ['Ankles', 'Calves'],
    image: null,
    steps: [
      'Sit or stand on one leg',
      'Lift one foot off ground',
      'Draw circles with toes, 10 each direction',
      'Switch feet and repeat'
    ],
    cues: [
      'Make full, controlled circles',
      'Keep leg still, move only ankle',
      'Go through full range of motion'
    ],
    mistakes: [
      'Moving too fast',
      'Making circles too small',
      'Moving entire leg'
    ]
  },
  {
    id: 'world_greatest_stretch',
    name: 'World\'s Greatest Stretch',
    category: 'stretch',
    muscles: ['Hip Flexors', 'Hamstrings', 'Thoracic Spine', 'Glutes'],
    image: null,
    steps: [
      'Start in push-up position',
      'Step right foot outside right hand',
      'Drop left elbow toward floor, rotate right arm to sky',
      'Return, repeat other side'
    ],
    cues: [
      'Keep back leg straight',
      'Drive knee out over pinky toe',
      'Rotate through thoracic spine'
    ],
    mistakes: [
      'Letting back knee touch ground',
      'Not rotating fully',
      'Rushing the movement'
    ]
  },
  {
    id: 'leg_swing',
    name: 'Leg Swings',
    category: 'stretch',
    muscles: ['Hip Flexors', 'Hamstrings', 'Adductors'],
    image: null,
    steps: [
      'Stand sideways to wall, hand on wall for balance',
      'Swing inside leg forward and back',
      'Gradually increase range of motion',
      '15-20 each direction, then lateral swings'
    ],
    cues: [
      'Keep torso stable',
      'Let momentum do the work',
      'Stand tall, don\'t lean'
    ],
    mistakes: [
      'Swinging too aggressively',
      'Leaning excessively',
      'Bending standing leg'
    ]
  }
];

const PROGRAMS = [
  // Road Running Programs
  {
    id: 'couch_to_5k',
    name: 'Couch to 5K',
    category: 'running',
    description: 'The classic beginner program to get you running 5 kilometers. Perfect for those new to running or returning after a break.',
    duration: '8 weeks',
    frequency: '3x/week',
    icon: 'running',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Run 1 min, walk 2 min x 8' },
          { day: 3, workout: 'Run 1 min, walk 2 min x 8' },
          { day: 5, workout: 'Run 1 min, walk 2 min x 8' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Run 2 min, walk 2 min x 6' },
          { day: 3, workout: 'Run 2 min, walk 2 min x 6' },
          { day: 5, workout: 'Run 2 min, walk 2 min x 6' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Run 3 min, walk 2 min x 5' },
          { day: 3, workout: 'Run 3 min, walk 2 min x 5' },
          { day: 5, workout: 'Run 4 min, walk 2 min x 4' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Run 5 min, walk 2 min x 4' },
          { day: 3, workout: 'Run 6 min, walk 2 min x 3' },
          { day: 5, workout: 'Run 8 min, walk 2 min x 3' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Run 10 min, walk 2 min x 2' },
          { day: 3, workout: 'Run 12 min, walk 2 min, run 10 min' },
          { day: 5, workout: 'Run 20 min continuous' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Run 22 min continuous' },
          { day: 3, workout: 'Run 25 min continuous' },
          { day: 5, workout: 'Run 25 min continuous' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'Run 28 min continuous' },
          { day: 3, workout: 'Run 28 min continuous' },
          { day: 5, workout: 'Run 30 min continuous' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Run 30 min (aim for 4km)' },
          { day: 3, workout: 'Run 30 min easy' },
          { day: 5, workout: '5K Race or Time Trial!' }
        ]
      }
    ]
  },
  {
    id: '10k_improver',
    name: '10K Improver',
    category: 'running',
    description: 'Take your running to the next level. This program builds endurance and speed for a strong 10K performance.',
    duration: '8 weeks',
    frequency: '4x/week',
    icon: 'running',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Easy run 5km' },
          { day: 3, workout: 'Intervals: 6x400m with 90s rest' },
          { day: 5, workout: 'Tempo run 3km at comfortably hard pace' },
          { day: 6, workout: 'Long run 8km easy' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Easy run 5km' },
          { day: 3, workout: 'Intervals: 5x600m with 2min rest' },
          { day: 5, workout: 'Tempo run 3.5km' },
          { day: 6, workout: 'Long run 9km easy' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Intervals: 4x800m with 2min rest' },
          { day: 5, workout: 'Tempo run 4km' },
          { day: 6, workout: 'Long run 10km easy' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Easy run 5km (recovery week)' },
          { day: 3, workout: 'Fartlek: 30min with 6x1min fast' },
          { day: 5, workout: 'Easy run 4km' },
          { day: 6, workout: 'Long run 8km easy' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Intervals: 3x1000m with 3min rest' },
          { day: 5, workout: 'Tempo run 4.5km' },
          { day: 6, workout: 'Long run 11km easy' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Intervals: 5x800m with 2min rest' },
          { day: 5, workout: 'Tempo run 5km' },
          { day: 6, workout: 'Long run 12km easy' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'Easy run 5km' },
          { day: 3, workout: 'Race pace: 2x2km at goal pace, 3min rest' },
          { day: 5, workout: 'Easy run 4km' },
          { day: 6, workout: 'Long run 10km with last 2km at tempo' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Easy run 4km' },
          { day: 3, workout: 'Shakeout: 3km easy with 4x100m strides' },
          { day: 5, workout: 'Rest or 2km very easy' },
          { day: 6, workout: '10K Race Day!' }
        ]
      }
    ]
  },
  {
    id: 'half_marathon',
    name: 'Half Marathon Builder',
    category: 'running',
    description: 'A comprehensive 12-week program to prepare you for the half marathon distance. Builds endurance progressively.',
    duration: '12 weeks',
    frequency: '4x/week',
    icon: 'running',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Tempo 3km' },
          { day: 5, workout: 'Easy run 5km' },
          { day: 6, workout: 'Long run 12km' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Intervals: 6x400m' },
          { day: 5, workout: 'Easy run 6km' },
          { day: 6, workout: 'Long run 14km' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Easy run 7km' },
          { day: 3, workout: 'Tempo 4km' },
          { day: 5, workout: 'Easy run 6km' },
          { day: 6, workout: 'Long run 15km' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Recovery run 5km' },
          { day: 3, workout: 'Easy run 5km' },
          { day: 5, workout: 'Easy run 5km' },
          { day: 6, workout: 'Long run 12km (recovery)' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Easy run 7km' },
          { day: 3, workout: 'Intervals: 4x800m' },
          { day: 5, workout: 'Easy run 6km' },
          { day: 6, workout: 'Long run 16km' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Easy run 7km' },
          { day: 3, workout: 'Tempo 5km' },
          { day: 5, workout: 'Easy run 7km' },
          { day: 6, workout: 'Long run 18km' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'Easy run 8km' },
          { day: 3, workout: 'Intervals: 3x1200m' },
          { day: 5, workout: 'Easy run 6km' },
          { day: 6, workout: 'Long run 19km' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Recovery run 5km' },
          { day: 3, workout: 'Easy run 5km' },
          { day: 5, workout: 'Easy run 5km' },
          { day: 6, workout: 'Long run 14km (recovery)' }
        ]
      },
      {
        week: 9,
        days: [
          { day: 1, workout: 'Easy run 8km' },
          { day: 3, workout: 'Tempo 6km' },
          { day: 5, workout: 'Easy run 7km' },
          { day: 6, workout: 'Long run 20km' }
        ]
      },
      {
        week: 10,
        days: [
          { day: 1, workout: 'Easy run 8km' },
          { day: 3, workout: 'Race pace: 2x3km' },
          { day: 5, workout: 'Easy run 6km' },
          { day: 6, workout: 'Long run 21km' }
        ]
      },
      {
        week: 11,
        days: [
          { day: 1, workout: 'Easy run 6km' },
          { day: 3, workout: 'Tempo 4km' },
          { day: 5, workout: 'Easy run 5km' },
          { day: 6, workout: 'Long run 14km' }
        ]
      },
      {
        week: 12,
        days: [
          { day: 1, workout: 'Easy run 4km' },
          { day: 3, workout: 'Shakeout 3km with strides' },
          { day: 5, workout: 'Rest' },
          { day: 6, workout: 'Half Marathon Race!' }
        ]
      }
    ]
  },
  // Trail Running Programs
  {
    id: 'trail_intro',
    name: 'Trail Running Introduction',
    category: 'trail',
    description: 'Transition from road to trail running. Learn technical skills, build leg strength, and enjoy nature around George.',
    duration: '6 weeks',
    frequency: '3x/week',
    icon: 'trail',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Easy trail 4km - focus on footing' },
          { day: 3, workout: 'Road run 5km' },
          { day: 6, workout: 'Trail hike/run 6km - walk uphills' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Technical trail 5km - practice rock hopping' },
          { day: 3, workout: 'Hill repeats 4x2min on trail' },
          { day: 6, workout: 'Trail run 7km - mixed terrain' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Trail intervals: 5x3min hard, 2min easy' },
          { day: 3, workout: 'Easy trail 5km' },
          { day: 6, workout: 'Long trail 8km - explore new route' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Recovery trail 4km' },
          { day: 3, workout: 'Easy run 4km (road or trail)' },
          { day: 6, workout: 'Trail run 6km - active recovery' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Technical downhill practice 5km' },
          { day: 3, workout: 'Hill power hiking + running 45min' },
          { day: 6, workout: 'Long trail 10km with elevation' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Trail fartlek 6km' },
          { day: 3, workout: 'Easy trail 5km' },
          { day: 6, workout: 'Trail adventure 12km - put it together!' }
        ]
      }
    ]
  },
  {
    id: 'hill_strength',
    name: 'Hill Strength Builder',
    category: 'trail',
    description: 'Build powerful legs for climbing. Perfect preparation for the hills around George and the Garden Route trails.',
    duration: '6 weeks',
    frequency: '3x/week',
    icon: 'trail',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Hill repeats: 6x1min, jog down recovery' },
          { day: 3, workout: 'Easy run 5km with 2 hills' },
          { day: 6, workout: 'Long hilly run 8km' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Hill repeats: 5x2min, walk down' },
          { day: 3, workout: 'Power hiking 45min - steep terrain' },
          { day: 6, workout: 'Long hilly run 9km' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Hill repeats: 4x3min hard effort' },
          { day: 3, workout: 'Hilly fartlek 6km' },
          { day: 6, workout: 'Long run with 400m+ elevation gain' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Easy hills 5km - recovery week' },
          { day: 3, workout: 'Power hiking 30min' },
          { day: 6, workout: 'Easy long run 7km' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Hill repeats: 3x5min sustained climb' },
          { day: 3, workout: 'Technical downhill + uphill work 50min' },
          { day: 6, workout: 'Long mountain run 12km' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Mixed hill workout: 2x(3min, 2min, 1min)' },
          { day: 3, workout: 'Easy hilly run 5km' },
          { day: 6, workout: 'Big day: 15km with significant climbing' }
        ]
      }
    ]
  },
  {
    id: 'technical_downhill',
    name: 'Technical Downhill Mastery',
    category: 'trail',
    description: 'Master the art of fast, safe descending. Build confidence and speed on technical terrain.',
    duration: '4 weeks',
    frequency: '3x/week',
    icon: 'trail',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Downhill drills: quick feet, body position' },
          { day: 3, workout: 'Mixed trail 6km - focus on descents' },
          { day: 6, workout: 'Long run 8km - practice reading terrain' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Downhill repeats: 4x90sec fast descent' },
          { day: 3, workout: 'Trail run 7km - vary descent speed' },
          { day: 6, workout: 'Technical trail 10km with rock sections' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Steep downhill practice + eccentric strength' },
          { day: 3, workout: 'Flow trail 8km - build rhythm' },
          { day: 6, workout: 'Long technical trail 12km' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Speed descents: 5x2min fast with good form' },
          { day: 3, workout: 'Easy recovery trail 5km' },
          { day: 6, workout: 'Test day: Fast technical descent route' }
        ]
      }
    ]
  },
  {
    id: 'back_to_back',
    name: 'Back-to-Back Long Runs',
    category: 'trail',
    description: 'Build ultra-distance endurance with consecutive long runs. Trains your body to run on tired legs.',
    duration: '6 weeks',
    frequency: '4x/week',
    icon: 'trail',
    schedule: [
      {
        week: 1,
        days: [
          { day: 2, workout: 'Easy run 5km' },
          { day: 4, workout: 'Trail run 6km' },
          { day: 6, workout: 'Long run 12km' },
          { day: 7, workout: 'Back-to-back: 8km easy' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 2, workout: 'Easy run 6km' },
          { day: 4, workout: 'Hill work 45min' },
          { day: 6, workout: 'Long run 14km' },
          { day: 7, workout: 'Back-to-back: 10km' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 2, workout: 'Easy run 6km' },
          { day: 4, workout: 'Trail run 8km' },
          { day: 6, workout: 'Long run 16km' },
          { day: 7, workout: 'Back-to-back: 12km' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 2, workout: 'Recovery run 4km' },
          { day: 4, workout: 'Easy trail 5km' },
          { day: 6, workout: 'Long run 10km (recovery)' },
          { day: 7, workout: 'Back-to-back: 8km easy' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 2, workout: 'Easy run 7km' },
          { day: 4, workout: 'Trail intervals 50min' },
          { day: 6, workout: 'Long run 18km' },
          { day: 7, workout: 'Back-to-back: 14km' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 2, workout: 'Easy run 6km' },
          { day: 4, workout: 'Moderate trail 8km' },
          { day: 6, workout: 'Long run 20km' },
          { day: 7, workout: 'Back-to-back: 15km - big weekend!' }
        ]
      }
    ]
  },
  // Weightlifting Programs
  {
    id: 'beginner_fullbody',
    name: 'Beginner Full Body',
    category: 'weights',
    description: 'Learn the fundamental movements with a simple, effective full-body routine. Perfect for building a strength foundation.',
    duration: '8 weeks',
    frequency: '3x/week',
    icon: 'weights',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Full Body A: Squat, Bench, Row' },
          { day: 3, workout: 'Full Body B: Deadlift, OHP, Pull-ups' },
          { day: 5, workout: 'Full Body A: Squat, Bench, Row' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Full Body B: Deadlift, OHP, Pull-ups' },
          { day: 3, workout: 'Full Body A: Squat, Bench, Row' },
          { day: 5, workout: 'Full Body B: Deadlift, OHP, Pull-ups' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Full Body A: Squat 3x6, Bench 3x6, Row 3x8' },
          { day: 3, workout: 'Full Body B: Deadlift 3x5, OHP 3x6, Pull-ups 3x6' },
          { day: 5, workout: 'Full Body A: Squat 3x6, Bench 3x6, Row 3x8' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Deload: All lifts at 60% for 3x5' },
          { day: 3, workout: 'Deload: Light technique work' },
          { day: 5, workout: 'Deload: All lifts at 60% for 3x5' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Full Body A: Squat 4x5, Bench 4x5, Row 3x8' },
          { day: 3, workout: 'Full Body B: Deadlift 3x5, OHP 4x5, Pull-ups 4x6' },
          { day: 5, workout: 'Full Body A: Add accessory work' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Full Body B + Lunges, Curls' },
          { day: 3, workout: 'Full Body A + Dips, Face Pulls' },
          { day: 5, workout: 'Full Body B + Core work' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'Full Body A: Work up to heavy 3x3' },
          { day: 3, workout: 'Full Body B: Volume day 4x8' },
          { day: 5, workout: 'Full Body A: Moderate 3x5' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Test week: Work up to 3RM squat' },
          { day: 3, workout: 'Test week: 3RM bench and deadlift' },
          { day: 5, workout: 'Light pump work - celebrate progress!' }
        ]
      }
    ]
  },
  {
    id: 'upper_lower_split',
    name: 'Upper/Lower Split',
    category: 'weights',
    description: 'A 4-day split for intermediate lifters. Allows more volume per muscle group while maintaining frequency.',
    duration: '8 weeks',
    frequency: '4x/week',
    icon: 'weights',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Upper A: Bench 4x6, Row 4x8, OHP 3x8, Curls' },
          { day: 2, workout: 'Lower A: Squat 4x6, RDL 3x8, Leg Press, Calves' },
          { day: 4, workout: 'Upper B: OHP 4x6, Pull-ups 4x8, Incline DB, Triceps' },
          { day: 5, workout: 'Lower B: Deadlift 4x5, Front Squat 3x8, Lunges' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Upper A: Add weight or reps from Week 1' },
          { day: 2, workout: 'Lower A: Progress squat, maintain accessories' },
          { day: 4, workout: 'Upper B: Progress OHP, add chin-up reps' },
          { day: 5, workout: 'Lower B: Progress deadlift' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Upper A: Heavy - work to 4x4 on compounds' },
          { day: 2, workout: 'Lower A: Heavy squat 4x4' },
          { day: 4, workout: 'Upper B: Volume - 4x10 on compounds' },
          { day: 5, workout: 'Lower B: Heavy deadlift 4x3' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Deload Upper: 3x5 at 60%' },
          { day: 2, workout: 'Deload Lower: 3x5 at 60%' },
          { day: 4, workout: 'Deload Upper: Light technique' },
          { day: 5, workout: 'Deload Lower: Light technique' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'Upper A: Reset with +5kg from Week 1' },
          { day: 2, workout: 'Lower A: Reset with progression' },
          { day: 4, workout: 'Upper B: New cycle begins' },
          { day: 5, workout: 'Lower B: Focus on form with new weights' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'Upper A: Build intensity' },
          { day: 2, workout: 'Lower A: Add paused squats' },
          { day: 4, workout: 'Upper B: Add drop sets' },
          { day: 5, workout: 'Lower B: Deficit deadlifts' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'Upper A: Peak week - heavy triples' },
          { day: 2, workout: 'Lower A: Heavy squat singles' },
          { day: 4, workout: 'Upper B: Heavy pressing' },
          { day: 5, workout: 'Lower B: Heavy deadlift work' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Test: Bench 1RM or 3RM' },
          { day: 2, workout: 'Test: Squat max' },
          { day: 4, workout: 'Test: OHP and Pull-ups max' },
          { day: 5, workout: 'Test: Deadlift max - finish strong!' }
        ]
      }
    ]
  },
  {
    id: 'strength_for_runners',
    name: 'Strength for Runners',
    category: 'weights',
    description: 'Designed specifically for runners. Build injury-resistant legs, core stability, and power without excessive bulk.',
    duration: '8 weeks',
    frequency: '2x/week',
    icon: 'weights',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'A: Goblet Squat 3x10, RDL 3x10, Step-ups, Plank' },
          { day: 4, workout: 'B: Split Squat 3x8, Hip Thrust 3x12, Calf Raises, Dead Bug' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'A: Progress weights, add Single-leg RDL' },
          { day: 4, workout: 'B: Progress split squat, add Copenhagen plank' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'A: Add plyometrics - Box jumps 3x5' },
          { day: 4, workout: 'B: Add lateral band walks, Monster walks' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Maintenance: 2x8 all exercises' },
          { day: 4, workout: 'Maintenance: Focus on mobility work' }
        ]
      },
      {
        week: 5,
        days: [
          { day: 1, workout: 'A: Back Squat 3x6, Nordic curls, Jump squats' },
          { day: 4, workout: 'B: Trap bar deadlift 3x6, Single-leg hops, Core' }
        ]
      },
      {
        week: 6,
        days: [
          { day: 1, workout: 'A: Power focus - Squat jumps, bounds' },
          { day: 4, workout: 'B: Strength endurance - High rep glute work' }
        ]
      },
      {
        week: 7,
        days: [
          { day: 1, workout: 'A: Full power circuit with plyos' },
          { day: 4, workout: 'B: Running-specific strength complex' }
        ]
      },
      {
        week: 8,
        days: [
          { day: 1, workout: 'Taper: Light maintenance 2x6' },
          { day: 4, workout: 'Taper: Activation work only - prep for race' }
        ]
      }
    ]
  },
  // Mobility Programs
  {
    id: 'pre_run_warmup',
    name: 'Pre-Run Dynamic Warm-up',
    category: 'mobility',
    description: 'A quick 5-10 minute routine to prepare your body for running. Activates muscles and increases mobility.',
    duration: 'Ongoing',
    frequency: 'Before runs',
    icon: 'mobility',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Leg swings, hip circles, walking lunges' },
          { day: 2, workout: 'A-skips, high knees, butt kicks' },
          { day: 3, workout: 'World\'s greatest stretch, ankle circles' }
        ]
      }
    ]
  },
  {
    id: 'post_run_stretches',
    name: 'Post-Run Recovery Stretches',
    category: 'mobility',
    description: '10-15 minute cool-down routine targeting runner-specific tight spots. Essential for recovery.',
    duration: 'Ongoing',
    frequency: 'After runs',
    icon: 'mobility',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Hamstring, quad, calf stretches - 30s each' },
          { day: 2, workout: 'Hip flexor, pigeon pose, IT band' },
          { day: 3, workout: 'Full sequence: all major muscle groups' }
        ]
      }
    ]
  },
  {
    id: 'hip_ankle_mobility',
    name: 'Hip & Ankle Mobility',
    category: 'mobility',
    description: 'Dedicated mobility work for runners. Improve hip extension, ankle dorsiflexion, and overall movement quality.',
    duration: '4 weeks',
    frequency: '3x/week',
    icon: 'mobility',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Hip CARs, 90/90 stretch, ankle rocks' },
          { day: 3, workout: 'Couch stretch, pigeon, wall ankle mob' },
          { day: 5, workout: 'Full hip flow sequence - 15 min' }
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, workout: 'Deep squat holds, hip flexor PAILs/RAILs' },
          { day: 3, workout: 'Ankle dorsiflexion work, calf stretching' },
          { day: 5, workout: 'Hip internal/external rotation focus' }
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, workout: 'Active hip mobility with bands' },
          { day: 3, workout: 'Ankle mobility circuit with elevation' },
          { day: 5, workout: 'Combined hip-ankle flow' }
        ]
      },
      {
        week: 4,
        days: [
          { day: 1, workout: 'Test mobility gains - retest movements' },
          { day: 3, workout: 'Maintenance routine A' },
          { day: 5, workout: 'Maintenance routine B' }
        ]
      }
    ]
  },
  {
    id: 'full_body_mobility',
    name: 'Full Body Mobility Routine',
    category: 'mobility',
    description: 'Comprehensive 20-minute routine addressing common tight areas. Great for rest days or evening wind-down.',
    duration: 'Ongoing',
    frequency: '2-3x/week',
    icon: 'mobility',
    schedule: [
      {
        week: 1,
        days: [
          { day: 1, workout: 'Cat-cow, thread the needle, child\'s pose' },
          { day: 3, workout: 'Hip series: 90/90, pigeon, frog stretch' },
          { day: 5, workout: 'Full body: shoulders, spine, hips, ankles' }
        ]
      }
    ]
  }
];

// Workout session templates for quick start
const QUICK_WORKOUTS = {
  run: {
    name: 'Quick Road Run',
    type: 'cardio',
    exercises: [
      { name: 'Dynamic Warm-up', duration: 300, type: 'timer' },
      { name: 'Easy Run', duration: 1800, type: 'timer', notes: '30 min at conversational pace' },
      { name: 'Cool Down Walk', duration: 300, type: 'timer' },
      { name: 'Post-Run Stretches', duration: 600, type: 'timer' }
    ]
  },
  trail: {
    name: 'Trail Run Session',
    type: 'cardio',
    exercises: [
      { name: 'Dynamic Warm-up', duration: 300, type: 'timer' },
      { name: 'Trail Run', duration: 2400, type: 'timer', notes: '40 min - enjoy the terrain!' },
      { name: 'Cool Down', duration: 300, type: 'timer' },
      { name: 'Hip & Leg Stretches', duration: 600, type: 'timer' }
    ]
  },
  weights: {
    name: 'Quick Strength Session',
    type: 'strength',
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: 10, rest: 90 },
      { exerciseId: 'pushup', sets: 3, reps: 15, rest: 60 },
      { exerciseId: 'dumbbell_row', sets: 3, reps: 10, rest: 60 },
      { exerciseId: 'lunge', sets: 3, reps: 10, rest: 60 },
      { exerciseId: 'plank', duration: 45, sets: 3, rest: 45 }
    ]
  },
  stretch: {
    name: 'Full Body Stretch',
    type: 'mobility',
    exercises: [
      { exerciseId: 'cat_cow', duration: 60, type: 'timer' },
      { exerciseId: 'hip_flexor_stretch', duration: 60, type: 'timer', notes: 'Each side' },
      { exerciseId: 'pigeon_pose', duration: 90, type: 'timer', notes: 'Each side' },
      { exerciseId: 'hamstring_stretch', duration: 60, type: 'timer', notes: 'Each side' },
      { exerciseId: 'quad_stretch', duration: 45, type: 'timer', notes: 'Each side' },
      { exerciseId: 'shoulder_stretch', duration: 45, type: 'timer', notes: 'Each side' },
      { exerciseId: 'world_greatest_stretch', duration: 60, type: 'timer', notes: 'Each side' }
    ]
  }
};

// Helper function to get exercise by ID
function getExerciseById(id) {
  return EXERCISES.find(ex => ex.id === id);
}

// Helper function to get program by ID
function getProgramById(id) {
  return PROGRAMS.find(p => p.id === id);
}

// Helper function to filter exercises
function filterExercises(category = 'all', searchTerm = '') {
  return EXERCISES.filter(ex => {
    const matchesCategory = category === 'all' || ex.category === category;
    const matchesSearch = searchTerm === '' || 
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
}

// Helper function to filter programs
function filterPrograms(category = 'all') {
  if (category === 'all') return PROGRAMS;
  return PROGRAMS.filter(p => p.category === category);
}
