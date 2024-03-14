import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const { searchData } = useApi()

  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState<SearchType>(SearchType.all)
  const [results, setResults] = useState<SearchResult[]>([])
  const [presentAlert] = useIonAlert()
  const [loading, dismiss] = useIonLoading()

  useEffect(() => {
    if (searchTerm === ''){
      setResults([])
      return
  }

  const loadData = async() => {
    const result: any = await searchData(searchTerm, type)
    console.log(result)
    if (result?.Error) {

    } else {
      setResults(result)
    }
  }
  loadData()
  },[searchTerm])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar value={searchTerm}
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)} autocapitalize={''}></IonSearchbar>

      <IonItem>
        <IonLabel>Select Searchtype</IonLabel>
        <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
        <IonSelectOption value="">All</IonSelectOption>
          <IonSelectOption value="movie">Movie</IonSelectOption>
          <IonSelectOption value="series">Series</IonSelectOption>
          <IonSelectOption value="episode">Episode</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonList>
        {Array.isArray(results) && results.map((item: SearchResult) => (
          <IonItem key={item.imdbID}>
            <IonLabel>{item.Title}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
