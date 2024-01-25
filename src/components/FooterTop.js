import { Box } from '@mui/material'
import React from 'react'
import FooterBox from './common/FooterBox'

function FooterTop({ onClickLinkHandler }) {
  const latestAlbums = [
    'Walkerworld',
    'Dunki',
    'Vikram Original Motion Picture Soundtrack',
    'Thallumaala',
    'Pushpa - The Rise',
    'Ninna Sanihake',
    'Praktan',
    'Still Rollin',
    'Bhavartha Mauli',
    'Yuva Sarkar',
    'Mal mahu jiban mati',
    "1989 (Taylor's Version)",
  ]

  const exploreMusicGenres = [
    'Rock Songs',
    'Patriotic songs',
    'Sufi Music',
    'Ghazals',
    'Workout Music',
    'Devotional Songs',
    'Sad Songs',
    'DJ Songs',
  ]

  const oldSongs = [
    'Old  Songs',
    'Old Hindi Songs',
    'Old English Songs',
    'Old Punjabi Songs',
    'Old Telugu Songs',
    'Old Tamil Songs',
    'Old Bengali Songs',
    'Old Malayalam Songs',
    'Old Kannada Songs',
  ]

  const topArtists = [
    'Guru Randhawa',
    'Arijit Singh',
    'Atif Aslam',
    'Justin Bieber',
    'Gulzar',
    'Armaan Malik',
    'Sidhu Moose Wala',
    'Alan Walker',
    'Udit Narayan',
    'Sonu Nigam',
    'Sid Sriram',
    'Akhil',
    'Darshan Raval',
    'Shreya Ghoshal',
    'Alka Yagnik',
  ]

  const regionalPlaylists = [
    'New Bengali Songs',
    'New Bhojpuri Songs',
    'New English Songs',
    'New Haryanvi Songs',
    'New Hindi Songs',
    'New Kannada Songs',
    'New Marathi Songs',
    'New Punjabi Songs',
    'New Tamil Songs',
    'New Telugu Songs',
    'New Odia Songs',
    'New Rajasthani Songs',
    'New Gujarati Songs',
    'New Assamese Songs',
  ]

  const latestSongs = [
    'Laal Peeli Akhiyaan (From "Teri Baaton Mein Aisa Uljha Jiya")',
    'Love Like That (feat. Ali Sethi)',
    'Dil Jhoom (From "Crakk - Jeetegaa Toh Jiyegaa")',
    'Heer Aasmani (From "Fighter")',
    'Jiya Jaise',
    'Kyun',
    'Saajan Ve',
    'Ishq Jaisa Kuch (From "Fighter")',
    'Bolna Tu Bantai',
    'Ishq Ibaadat',
    'Jo Tu Milta',
    'Khwahishein',
    'Mirza',
    'Laayee Mohabbat',
    'Baarish Ke Mausam Mein',
  ]

  const trendingSongs = [
    'O Maahi (From "Dunki")',
    'Satranga (From "ANIMAL")',
    'Pehle Bhi Main',
    'Arjan Vailly',
    'Kurchi Madathapetti',
    'Lutt Putt Gaya (From "Dunki")',
    'Chaleya (From "Jawan")',
    'Apna Bana Le',
    'Hua Main',
    'Saari Duniya Jalaa Denge',
    'Heeriye (feat. Arijit Singh)',
    'Ram Siya Ram (From "Adipurush")',
    'Khwahishein',
    'Dil Haareya',
    'Tu hai kahan',
  ]

  const songsWithLyrics = [
    'Coca Cola',
    'Bom Diggy Diggy',
    'Machayenge',
    'Tera Yaar Hoon Main',
    'Kar Gayi Chull (From "Kapoor & Sons (Since 1921)")',
    'Morni Banke',
    'Chalti Hai Kya 9 Se 12',
    'Hawayein',
  ]

  const wynkTopHits = [
    'Top 20 Bollywood Songs',
    'Wynk Top 100 Songs',
    'Top 20 English Songs',
    'Trending Reels Songs',
  ]

  const devotionalSongs = [
    'Ganesh Ji Ki Aarti',
    'Laxmi Ji Ki Aarti',
    'Shri Hanuman Chalisa',
    'Shiv Bhajan',
    'Gurbani',
    'Gurbani Shabad',
    'Islamic Songs',
    'Jesus Songs',
    'Christian Songs',
  ]

  const joinWynkForArtists = ['Wynk Studio', 'Wynk Studio for Artists']

  return (
    <Box display='flex' gap='2.5em' flexWrap='wrap' marginBottom='2em'>
      <FooterBox
        title='Latest Albums'
        data={latestAlbums}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Explore Music Genres'
        data={exploreMusicGenres}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Old Songs'
        data={oldSongs}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Top Artists'
        data={topArtists}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Regional Playlists'
        data={regionalPlaylists}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Latest Songs'
        data={latestSongs}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Trending Songs'
        data={trendingSongs}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Songs With Lyrics'
        data={songsWithLyrics}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Wynk Top Hits'
        data={wynkTopHits}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Devotional Songs'
        data={devotionalSongs}
        onClickLinkHandler={onClickLinkHandler}
      />
      <FooterBox
        title='Join Wynk For Artists'
        data={joinWynkForArtists}
        onClickLinkHandler={onClickLinkHandler}
      />
    </Box>
  )
}

export default FooterTop
