import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { removeEventFromDays } from "src/utils/Event";


export const handleSelect = (days, setDays, events, setEvents) => ({ start, end }) => {
    createSelectDialog("Select a subject:", [ "Option 1", "Option 2", "Option 3" ], (selectedSubject) => {
        if (selectedSubject) {
            const startTime = moment(start).format("hh:mm");
            const endTime = moment(end).format("hh:mm");
            const dayOfWeek = moment(start).format("dddd");
            const eventId = uuidv4();

            const event = {
                id: eventId,
                start,
                end,
                subject: selectedSubject,
            };

            const updatedDays = days.map((day) => {
                if (day.day === dayOfWeek) {
                    day.periods.push({
                        subject: selectedSubject,
                        start_time: startTime,
                        end_time: endTime,
                    });
                }
                return day;
            });

            setEvents([ ...events, event ]);
            setDays(updatedDays);
        }
    });
};

const createSelectDialog = (message, options, callback) => {
    const selectElement = document.createElement("select");

    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.text = option;
        selectElement.add(optionElement);
    });

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "OK";

    const containerElement = document.createElement("div");
    containerElement.appendChild(document.createTextNode(message));
    containerElement.appendChild(selectElement);
    containerElement.appendChild(buttonElement);

    const dialog = document.createElement("dialog");
    dialog.appendChild(containerElement);

    buttonElement.addEventListener("click", () => {
        dialog.close();
        callback(selectElement.value);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
};


export const handleKeyPress = (days, setDays, events, setEvents) => (event) => {
    if (event.key === "Delete") {
        const eventId = event.currentTarget.dataset.id;
        const removedEvent = events.find((event) => event.id === eventId);
        const updatedDays = removeEventFromDays(days, removedEvent);
        setEvents(events.filter((event) => event.id !== eventId));
        setDays(updatedDays);
    }
};