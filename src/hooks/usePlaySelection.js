import { useState } from 'react';

export const usePlaySelection = (setGamePhase) => {
  const [selectedPlayType, setSelectedPlayType] = useState(null);
  const [selectedPlay, setSelectedPlay] = useState(null);
  const [showPlayHints, setShowPlayHints] = useState(false);
  const [baseRoutes, setBaseRoutes] = useState([]);
  const [customRoutes, setCustomRoutes] = useState([]);
  const [selectedReceiverForHotRoute, setSelectedReceiverForHotRoute] = useState(null);
  const [showHotRouteMenu, setShowHotRouteMenu] = useState(false);

  const handlePlaySelect = (play) => {
    setSelectedPlay(play);
    if (play.routes) {
      setBaseRoutes(play.routes);
      setCustomRoutes(JSON.parse(JSON.stringify(play.routes)));
      setSelectedPlayType('pass');
    } else {
      setSelectedPlayType('run');
    }
    setGamePhase('see-defense');
  };

  const handleHotRoute = (receiverId) => {
    setSelectedReceiverForHotRoute(receiverId);
    setShowHotRouteMenu(true);
  };

  const applyHotRoute = (newRoute) => {
    setCustomRoutes(prev => prev.map(r =>
      r.receiver === selectedReceiverForHotRoute
        ? { ...r, route: newRoute }
        : r
    ));
    setShowHotRouteMenu(false);
    setSelectedReceiverForHotRoute(null);
  };

  const cancelHotRoute = () => {
    setShowHotRouteMenu(false);
    setSelectedReceiverForHotRoute(null);
  };

  const finishHotRoutes = () => {
    setGamePhase('snap-count');
  };

  const handleConfirmPlay = () => {
    setGamePhase('snap-count');
  };

  const handleAudible = (newPlay) => {
    setSelectedPlay(newPlay);
    if (newPlay.routes) {
      setBaseRoutes(newPlay.routes);
      setCustomRoutes(JSON.parse(JSON.stringify(newPlay.routes)));
      setSelectedPlayType('pass');
    } else {
      setSelectedPlayType('run');
    }
  };

  const resetPlaySelectionState = () => {
    setSelectedPlay(null);
    setBaseRoutes([]);
    setCustomRoutes([]);
    setSelectedReceiverForHotRoute(null);
    setShowHotRouteMenu(false);
    setSelectedPlayType(null);
    setShowPlayHints(false);
  };

  return {
    selectedPlayType, selectedPlay, showPlayHints,
    baseRoutes, customRoutes,
    selectedReceiverForHotRoute, showHotRouteMenu,
    handlePlaySelect, handleHotRoute, applyHotRoute, cancelHotRoute,
    finishHotRoutes, handleConfirmPlay, handleAudible,
    resetPlaySelectionState,
  };
};
