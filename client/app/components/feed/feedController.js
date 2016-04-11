angular.module('app.feed', [])
  .controller('feedController', [function() {
    this.data = [
    {
      title: 'My Little Project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis suscipit urna, eget aliquet turpis. Donec feugiat, lacus non lacinia pharetra, felis libero rutrum nisi, non facilisis magna tortor auctor nisi. Nunc sed massa mauris. Sed quis dui vel neque lacinia maximus. Aenean hendrerit nec leo sed porttitor. Suspendisse potenti. Morbi porttitor et sem eu sollicitudin. Aliquam vehicula purus ac velit suscipit, auctor dictum est mattis. Nunc suscipit odio felis, non interdum velit sagittis nec. Nam erat justo, euismod vitae pretium vel, elementum non sem. Vestibulum auctor augue lorem, ut eleifend massa varius sed. Vestibulum dui tellus, tincidunt sed tortor eget, fringilla lacinia nisl. Suspendisse in neque porttitor, faucibus diam eget, dictum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      owner: 'Trevor',
      location: 'San Francisco',
      contributors: ['Mark', 'Trevor', 'Nassir'],
      images: ['http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg',
               'http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg',
               'http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg'],
      reputation: 0
    },
    {
      title: 'My Littler Projecto',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis suscipit urna, eget aliquet turpis. Donec feugiat, lacus non lacinia pharetra, felis libero rutrum nisi, non facilisis magna tortor auctor nisi. Nunc sed massa mauris. Sed quis dui vel neque lacinia maximus. Aenean hendrerit nec leo sed porttitor. Suspendisse potenti. Morbi porttitor et sem eu sollicitudin. Aliquam vehicula purus ac velit suscipit, auctor dictum est mattis. Nunc suscipit odio felis, non interdum velit sagittis nec. Nam erat justo, euismod vitae pretium vel, elementum non sem. Vestibulum auctor augue lorem, ut eleifend massa varius sed. Vestibulum dui tellus, tincidunt sed tortor eget, fringilla lacinia nisl. Suspendisse in neque porttitor, faucibus diam eget, dictum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      owner: 'Marko',
      location: 'San Joseo',
      contributors: ['Marko', 'Trevoro', 'Nassiro'],
      images: ['http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg',
               'http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg',
               'http://www.aviatorcameragear.com/wp-content/uploads/2012/07/placeholder_2.jpg'],
      reputation: 0
    }
    ];

    this.removeOne = function() {
      this.data.shift();
    };
  }]);