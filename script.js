/* ================================================
   CV Template — Interactive JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ——————————————————————————————————
    // 1. Dark / Light Theme Toggle
    // ——————————————————————————————————
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('cv-theme');

    // Leaflet map variables
    let mapInitialized = false;
    let myMap;
    let tileLayer;
    const lightTiles = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('cv-theme', next);
        updateThemeIcon(next);

        // Dynamic map tile switching
        if (mapInitialized && tileLayer && myMap) {
            tileLayer.setUrl(next === 'dark' ? darkTiles : lightTiles);
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // ——————————————————————————————————
    // 2. Print / Download
    // ——————————————————————————————————
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });

    // ——————————————————————————————————
    // 3. Scroll-to-top button
    // ——————————————————————————————————
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ——————————————————————————————————
    // 4. Animate skill bars on scroll
    // ——————————————————————————————————
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;
        const container = document.querySelector('.skills-container');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillFills.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 120);
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run on load in case already in view

    // ——————————————————————————————————
    // 5. Intersection Observer for sections
    // ——————————————————————————————————
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));

    // ——————————————————————————————————
    // 6. Staggered entrance for timeline items
    // ——————————————————————————————————
    const timelineItems = document.querySelectorAll('.timeline-item');
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
        tlObserver.observe(item);
    });

    // ——————————————————————————————————
    // 7. Staggered entrance for project & cert cards
    // ——————————————————————————————————
    const cards = document.querySelectorAll('.project-card, .cert-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        cardObserver.observe(card);
    });

    // ——————————————————————————————————
    // 8. Typing effect on the job title
    // ——————————————————————————————————
    const titleEl = document.querySelector('.title');
    if (titleEl) {
        const originalText = titleEl.textContent;
        titleEl.textContent = '';
        let charIndex = 0;
        function typeChar() {
            if (charIndex < originalText.length) {
                titleEl.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50 + Math.random() * 40);
            }
        }
        setTimeout(typeChar, 600);
    }

    // ——————————————————————————————————
    // 9. Smooth parallax on sidebar photo
    // ——————————————————————————————————
    const photo = document.querySelector('.profile-photo');
    if (photo && window.innerWidth > 900) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            photo.style.transform = `translateY(${y * 0.08}px) scale(${1 - y * 0.0002})`;
        });
    }

    // ——————————————————————————————————
    // 10. Interactive Leaflet Map
    // ——————————————————————————————————
    const mapSection = document.getElementById('map-section');

    function initMap() {
        if (mapInitialized) return;

        myMap = L.map('map', {
            center: [27.65, 84.85],
            zoom: 8.5,
            scrollWheelZoom: true
        });

        const currentTheme = root.getAttribute('data-theme') || 'light';
        const tilesUrl = currentTheme === 'dark' ? darkTiles : lightTiles;

        tileLayer = L.tileLayer(tilesUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19
        }).addTo(myMap);

        // Additional basemap layers
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 19
        });

        const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            maxZoom: 17
        });

        // Layer selection options
        const baseMaps = {
            "Standard (Themed)": tileLayer,
            "Satellite View": satelliteLayer,
            "Terrain Map": topoLayer
        };

        // Add Layer switcher control (top-right) and Scale control (bottom-left)
        L.control.layers(baseMaps, null, { position: 'topright' }).addTo(myMap);
        L.control.scale({ position: 'bottomleft', imperial: false }).addTo(myMap);


        // ==========================================
        // pg_featureserv GeoJSON Client Integration
        // ==========================================
        let activeCollectionId = null;
        let legendControl = null;
        let loadedGeoJsonLayer = null;
        let originalGeoJsonData = null; // Store features locally for filtering
        let activeFilter = null; // Store active filter setting

        // DOM elements
        const btnLoadDistricts = document.getElementById('btn-load-districts');
        const btnLoadProtected = document.getElementById('btn-load-protected');
        const gisStatus = document.getElementById('gis-status');

        const stylingSection = document.getElementById('styling-section');
        const strokeColorInput = document.getElementById('style-stroke-color');
        const fillColorInput = document.getElementById('style-fill-color');
        const weightInput = document.getElementById('style-weight');
        const opacityInput = document.getElementById('style-opacity');
        const weightVal = document.getElementById('weight-val');
        const opacityVal = document.getElementById('opacity-val');
        const enableChoropleth = document.getElementById('enable-choropleth');
        const choroplethToggleGroup = document.getElementById('choropleth-toggle-group');

        const querySection = document.getElementById('query-section');
        const selectLimit = document.getElementById('query-limit');
        const selectFilterProp = document.getElementById('filter-property');
        const inputFilterVal = document.getElementById('filter-value');
        const btnApplyFilter = document.getElementById('btn-apply-filter');
        const btnClearFilter = document.getElementById('btn-clear-filter');
        const sqlExpressionInput = document.getElementById('sql-expression');
        const btnApplySql = document.getElementById('btn-apply-sql');

        // Update styling labels dynamically
        weightInput.addEventListener('input', (e) => {
            weightVal.textContent = e.target.value + 'px';
            updateLayerStyle();
        });
        opacityInput.addEventListener('input', (e) => {
            opacityVal.textContent = (e.target.value / 100).toFixed(1);
            updateLayerStyle();
        });
        strokeColorInput.addEventListener('input', updateLayerStyle);
        fillColorInput.addEventListener('input', updateLayerStyle);
        if (enableChoropleth) {
            enableChoropleth.addEventListener('change', updateLayerStyle);
        }

        selectLimit.addEventListener('change', () => {
            if (activeCollectionId) {
                const cqlExpr = sqlExpressionInput ? sqlExpressionInput.value.trim() : '';
                if (cqlExpr) {
                    loadLayer(activeCollectionId, null, cqlExpr);
                } else {
                    loadLayer(activeCollectionId, activeFilter);
                }
            }
        });

        inputFilterVal.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnApplyFilter.click();
            }
        });

        if (sqlExpressionInput) {
            sqlExpressionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    btnApplySql.click();
                }
            });
        }

        // Base URL for local pg_featureserv
        const baseUrl = 'https://my-cv-de0m.onrender.com';

        // Choropleth Helpers
        function getChoroplethColor(d) {
            return d > 700000 ? '#8c2d04' :
                   d > 500000 ? '#d94801' :
                   d > 300000 ? '#f16913' :
                   d > 200000 ? '#fd8d3c' :
                   d > 100000 ? '#fdae6b' :
                   d > 50000  ? '#fdd0a2' :
                                '#feedde';
        }

        function addLegend() {
            if (legendControl) {
                myMap.removeControl(legendControl);
            }
            legendControl = L.control({ position: 'bottomright' });
            legendControl.onAdd = function (map) {
                const div = L.DomUtil.create('div', 'info legend');
                const grades = [0, 50000, 100000, 200000, 300000, 500000, 700000];
                div.innerHTML = '<h4 style="margin: 0 0 6px 0; font-size: 0.72rem; font-weight: 700; color: var(--text-primary);">Total Population</h4>';
                for (let i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getChoroplethColor(grades[i] + 1) + '; width: 14px; height: 14px; float: left; opacity: 0.7; margin-right: 8px;"></i> ' +
                        grades[i].toLocaleString() + (grades[i + 1] ? '&ndash;' + grades[i + 1].toLocaleString() + '<br>' : '+');
                }
                return div;
            };
            legendControl.addTo(myMap);
        }

        function removeLegend() {
            if (legendControl) {
                myMap.removeControl(legendControl);
                legendControl = null;
            }
        }

        // SQL Expression Evaluator for local fallback querying
        function evaluateSqlExpression(props, expression) {
            if (!expression) return true;
            let jsExpr = expression;

            // Step 1: Handle LIKE first, before any other replacements
            jsExpr = jsExpr.replace(/(\w+)\s+LIKE\s+'%?([^%']+)%?'/gi, (match, prop, val) => {
                return `__LIKE__${prop}__${val.toLowerCase()}__ENDLIKE__`;
            });

            // Step 2: Translate logical operators (case-insensitive)
            jsExpr = jsExpr.replace(/\bAND\b/gi, '&&');
            jsExpr = jsExpr.replace(/\bOR\b/gi, '||');

            // Step 3: Replace comparison operators (order matters — multi-char first)
            jsExpr = jsExpr.replace(/>=/g, '>=');
            jsExpr = jsExpr.replace(/<=/g, '<=');
            jsExpr = jsExpr.replace(/<>/g, '!==');
            jsExpr = jsExpr.replace(/!=/g, '!==');
            // Replace single = not preceded or followed by ! < > =
            jsExpr = jsExpr.replace(/(?<![!<>=])=(?!=)/g, '===');

            // Step 4: Replace property column names with props['key'] lookups
            // Sort by length desc to avoid partial matches of short names inside longer ones
            const sortedKeys = Object.keys(props).sort((a, b) => b.length - a.length);
            sortedKeys.forEach(key => {
                const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(?<!['"])\\b${escaped}\\b(?!['"])`, 'g');
                jsExpr = jsExpr.replace(regex, `props['${key}']`);
            });

            // Step 5: Resolve LIKE placeholders now that prop names are expanded
            jsExpr = jsExpr.replace(/__LIKE__(\w+)__([^_]+)__ENDLIKE__/g, (match, prop, val) => {
                return `String(props['${prop}']).toLowerCase().includes('${val}')`;
            });

            try {
                const fn = new Function('props', `try { return (${jsExpr}); } catch(e) { return false; }`);
                return fn(props);
            } catch (e) {
                console.warn('SQL Eval syntax error:', e, '| Expression:', jsExpr);
                return false;
            }
        }

        // Fetch layer GeoJSON from pg_featureserv with query/filter parameters
        async function loadLayer(collectionId, customFilter = null, cqlFilter = null) {
            const limit = selectLimit.value;
            showStatus('Fetching GeoJSON...', 'loading');
            
            // Construct query string
            const isNumeric = customFilter && !isNaN(customFilter.val) && customFilter.val.trim() !== '';
            const cqlVal = (customFilter && !isNumeric) ? `'${customFilter.val}'` : (customFilter ? customFilter.val : null);
            const simpleCql = customFilter ? `${customFilter.prop} = ${cqlVal}` : null;
            const finalCqlFilter = cqlFilter || simpleCql;

            let fetchUrl = `${baseUrl}/collections/${encodeURIComponent(collectionId)}/items.json?limit=${limit}`;
            if (finalCqlFilter) {
                fetchUrl += `&filter=${encodeURIComponent(finalCqlFilter)}&filter-lang=cql-text`;
            }

            let response;
            try {
                response = await fetch(fetchUrl);
                if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            } catch (err) {
                console.log("Server query failed. Falling back to client-side JS evaluator.");
                const fallbackUrl = `${baseUrl}/collections/${encodeURIComponent(collectionId)}/items.json?limit=${limit}`;
                try {
                    const fallbackResponse = await fetch(fallbackUrl);
                    if (!fallbackResponse.ok) throw new Error(`Fallback HTTP Error ${fallbackResponse.status}`);
                    const fullGeoJson = await fallbackResponse.json();
                    
                    const filteredFeatures = finalCqlFilter 
                        ? fullGeoJson.features.filter(f => evaluateSqlExpression(f.properties, finalCqlFilter))
                        : fullGeoJson.features;
                    
                    if (filteredFeatures.length === 0) {
                        showStatus('No matching features found.', 'error');
                        clearLoadedLayer();
                        disableSubsections();
                        return;
                    }

                    const filteredGeoJson = { type: 'FeatureCollection', features: filteredFeatures };
                    originalGeoJsonData = fullGeoJson;
                    activeCollectionId = collectionId;

                    renderGeoJson(filteredGeoJson);
                    if (choroplethToggleGroup) {
                        choroplethToggleGroup.style.display = (activeCollectionId === 'public.districts_clean_wgs84') ? 'flex' : 'none';
                        if (activeCollectionId !== 'public.districts_clean_wgs84') removeLegend();
                    }
                    enableSubsections();
                    showStatus(`Loaded ${filteredFeatures.length} filtered features (Local SQL)!`, 'success');
                    btnClearFilter.style.display = 'block';
                    return;
                } catch (fallbackErr) {
                    showStatus(`Query failed: ${fallbackErr.message}`, 'error');
                    disableSubsections();
                    return;
                }
            }

            // Normal successful fetch path
            try {
                const geoJson = await response.json();
                if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
                    showStatus('Success, but no features returned.', 'success');
                    clearLoadedLayer();
                    disableSubsections();
                    return;
                }

                originalGeoJsonData = geoJson;
                activeCollectionId = collectionId;

                // Show/hide choropleth toggle
                if (choroplethToggleGroup) {
                    if (activeCollectionId === 'public.districts_clean_wgs84') {
                        choroplethToggleGroup.style.display = 'flex';
                    } else {
                        choroplethToggleGroup.style.display = 'none';
                        removeLegend();
                    }
                }

                // Render layer geometries
                renderGeoJson(geoJson);

                // Populate filter dropdown only on fresh load (no active filter)
                if (!finalCqlFilter) {
                    populateFilterProperties(geoJson.features[0].properties);
                }

                // Enable controls
                enableSubsections();

                if (finalCqlFilter) {
                    showStatus(`${geoJson.features.length} features matched!`, 'success');
                    btnClearFilter.style.display = 'block';
                } else {
                    showStatus(`Loaded ${geoJson.features.length} features!`, 'success');
                    btnClearFilter.style.display = 'none';
                }
            } catch (err) {
                console.error(err);
                showStatus(`Failed to parse response: ${err.message}`, 'error');
                disableSubsections();
            }
        }

        // Bind quick click handlers
        btnLoadDistricts.addEventListener('click', () => {
            activeFilter = null;
            inputFilterVal.value = '';
            loadLayer('public.districts_clean_wgs84');
        });
        btnLoadProtected.addEventListener('click', () => {
            activeFilter = null;
            inputFilterVal.value = '';
            loadLayer('public.protected_areas — padnepal');
        });

        // Render GeoJSON with user styling configurations
        function renderGeoJson(geoJson) {
            clearLoadedLayer();

            const strokeColor = strokeColorInput.value;
            const fillColor = fillColorInput.value;
            const weight = parseInt(weightInput.value);
            const opacity = parseFloat(opacityInput.value) / 100;
            const useChoropleth = enableChoropleth && enableChoropleth.checked;

            if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth) {
                addLegend();
            } else {
                removeLegend();
            }

            loadedGeoJsonLayer = L.geoJSON(geoJson, {
                style: function (feature) {
                    let finalFill = fillColor;
                    if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth && feature.properties && feature.properties.Total !== undefined) {
                        finalFill = getChoroplethColor(feature.properties.Total);
                    }
                    return {
                        color: strokeColor,
                        fillColor: finalFill,
                        weight: weight,
                        opacity: 1,
                        fillOpacity: opacity
                    };
                },
                onEachFeature: function (feature, layer) {
                    // Bind descriptive sticky tooltip that shows automatically on hover
                    if (feature.properties) {
                        let tooltipHTML = '<div style="width: 200px; max-height: 180px; overflow-y: auto;">';
                        tooltipHTML += '<h4 style="margin: 0 0 6px 0; border-bottom: 1px solid var(--border); padding-bottom: 4px; font-weight: 700; color: var(--accent); font-size: 0.75rem;"><i class="fa-solid fa-database"></i> Feature Attributes</h4>';
                        tooltipHTML += '<table style="font-size: 0.7rem; border-collapse: collapse; width: 100%; line-height: 1.4;">';
                        for (const [key, value] of Object.entries(feature.properties)) {
                            const displayedVal = typeof value === 'object' ? JSON.stringify(value) : value;
                            tooltipHTML += `<tr style="border-bottom: 1px dotted var(--border);"><td style="padding: 2px 4px; font-weight: 600; color: var(--text-primary);">${key}</td><td style="padding: 2px 4px; color: var(--text-secondary); word-break: break-all;">${displayedVal}</td></tr>`;
                        }
                        tooltipHTML += '</table></div>';
                        layer.bindTooltip(tooltipHTML, { sticky: true, opacity: 0.95 });
                        
                        // Fallback click popup
                        layer.bindPopup(tooltipHTML);
                    }

                    // Mouse interactions
                    layer.on({
                        mouseover: function (e) {
                            const l = e.target;
                            let finalFill = fillColor;
                            if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth && l.feature.properties && l.feature.properties.Total !== undefined) {
                                finalFill = getChoroplethColor(l.feature.properties.Total);
                            }
                            l.setStyle({
                                weight: weight + 2,
                                fillColor: finalFill,
                                fillOpacity: Math.min(opacity + 0.25, 1)
                            });
                        },
                        mouseout: function (e) {
                            const l = e.target;
                            let finalFill = fillColor;
                            if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth && l.feature.properties && l.feature.properties.Total !== undefined) {
                                finalFill = getChoroplethColor(l.feature.properties.Total);
                            }
                            l.setStyle({
                                weight: weight,
                                fillColor: finalFill,
                                fillOpacity: opacity
                            });
                        }
                    });
                }
            }).addTo(myMap);

            // Center on data layer with smooth fly-in animation
            if (loadedGeoJsonLayer && loadedGeoJsonLayer.getBounds().isValid()) {
                myMap.flyToBounds(loadedGeoJsonLayer.getBounds(), {
                    padding: [40, 40],
                    duration: 1.5,
                    easeLinearity: 0.25
                });
            }
        }

        // Apply updated styling on active layer dynamically
        function updateLayerStyle() {
            if (!loadedGeoJsonLayer) return;
            
            const strokeColor = strokeColorInput.value;
            const fillColor = fillColorInput.value;
            const weight = parseInt(weightInput.value);
            const opacity = parseFloat(opacityInput.value) / 100;
            const useChoropleth = enableChoropleth && enableChoropleth.checked;

            if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth) {
                addLegend();
            } else {
                removeLegend();
            }

            loadedGeoJsonLayer.eachLayer(layer => {
                let finalFill = fillColor;
                if (activeCollectionId === 'public.districts_clean_wgs84' && useChoropleth && layer.feature.properties && layer.feature.properties.Total !== undefined) {
                    finalFill = getChoroplethColor(layer.feature.properties.Total);
                }
                layer.setStyle({
                    color: strokeColor,
                    fillColor: finalFill,
                    weight: weight,
                    fillOpacity: opacity
                });
            });
        }

        // Populate dropdown select with column property names
        function populateFilterProperties(properties) {
            selectFilterProp.innerHTML = '<option value="">-- Select Column --</option>';
            if (!properties) return;
            
            Object.keys(properties).forEach(prop => {
                const opt = document.createElement('option');
                opt.value = prop;
                opt.textContent = prop;
                selectFilterProp.appendChild(opt);
            });
        }

        // Server-side filter tool execution
        btnApplyFilter.addEventListener('click', () => {
            const prop = selectFilterProp.value;
            const val = inputFilterVal.value.trim();

            if (!prop || !activeCollectionId) return;
            if (!val) {
                btnClearFilter.click();
                return;
            }

            activeFilter = { prop, val };
            if (sqlExpressionInput) sqlExpressionInput.value = ''; // Clear SQL
            loadLayer(activeCollectionId, activeFilter);
        });

        // Custom SQL expression filter execution
        if (btnApplySql) {
            btnApplySql.addEventListener('click', () => {
                const expr = sqlExpressionInput ? sqlExpressionInput.value.trim() : '';
                if (!expr || !activeCollectionId) return;

                activeFilter = null; // Clear simple filter
                inputFilterVal.value = '';
                selectFilterProp.selectedIndex = 0;
                loadLayer(activeCollectionId, null, expr);
            });
        }

        // Reset filter
        btnClearFilter.addEventListener('click', () => {
            activeFilter = null;
            inputFilterVal.value = '';
            selectFilterProp.selectedIndex = 0;
            if (sqlExpressionInput) sqlExpressionInput.value = '';
            if (activeCollectionId) {
                loadLayer(activeCollectionId);
            }
        });

        // Helper functions
        function showStatus(msg, type) {
            gisStatus.textContent = `Status: ${msg}`;
            gisStatus.className = 'gis-status';
            if (type) {
                gisStatus.classList.add(type);
            }
        }

        function clearLoadedLayer() {
            if (loadedGeoJsonLayer) {
                myMap.removeLayer(loadedGeoJsonLayer);
                loadedGeoJsonLayer = null;
            }
            removeLegend();
        }

        function enableSubsections() {
            stylingSection.classList.remove('disabled');
            querySection.classList.remove('disabled');
            selectFilterProp.disabled = false;
            inputFilterVal.disabled = false;
            btnApplyFilter.disabled = false;
            if (sqlExpressionInput) sqlExpressionInput.disabled = false;
            if (btnApplySql) btnApplySql.disabled = false;
        }

        function disableSubsections() {
            stylingSection.classList.add('disabled');
            querySection.classList.add('disabled');
            selectFilterProp.disabled = true;
            inputFilterVal.disabled = true;
            btnApplyFilter.disabled = true;
            btnClearFilter.style.display = 'none';
            if (choroplethToggleGroup) choroplethToggleGroup.style.display = 'none';
            originalGeoJsonData = null;
            activeFilter = null;
            activeCollectionId = null;
            removeLegend();
        }

        mapInitialized = true;
    }

    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initMap();
                setTimeout(() => {
                    if (myMap) myMap.invalidateSize();
                }, 250);
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (mapSection) {
        mapObserver.observe(mapSection);
    }
});
