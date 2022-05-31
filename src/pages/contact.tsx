import {
  Box,
  Button,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useState } from 'react'
import Layout from '~/components/Layout'
import SEO from '~/components/SEO'
import regex from '~/constants/regex'

const Contact = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: '',
      subject: '',
      body: ''
    },

    validate: {
      email: (value: string) => {
        if (!regex.email.test(value)) {
          return 'Please enter a valid email address'
        }
      }
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)

    try {
      await axios.post('/api/contact', values)

      showNotification({
        title: 'Message sent',
        message: "We'll be back to you as soon as possible!",
        color: 'green'
      })
    } catch (err) {
      console.error(err)
      showNotification({
        title: 'An error occured',
        message: 'Please try again later',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <SEO title="Contact us" />

      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
        <Box>
          <Title order={1} mb="md">
            Need assistance or have a question?
          </Title>

          <Text mb="xl">
            Fill out the form and we will get back to you within one business
            day.
          </Text>

          <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="450"
            viewBox="0 0 844.6701 630.24829"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            mx="auto"
            sx={{ maxWidth: '100%' }}
          >
            <path
              d="M839.46184,39.15464H300.98025c-1.18265-.02612-2.12021-1.00603-2.09409-2.18867,.0253-1.14589,.94818-2.0688,2.09409-2.0941H839.46184c1.18268,.02612,2.12024,1.00603,2.09412,2.18867-.02533,1.14589-.94824,2.0688-2.09412,2.0941Z"
              fill="#e6e6e6"
            />
            <path
              d="M395.81191,259.20912h217.25076c.55225,0,.99994,.44766,.99994,.99991v126.32349c0,.55225-.44769,.99994-.99994,.99994h-217.25076v-128.32333h0Z"
              fill="#e6e6e6"
            />
            <path
              d="M612.80742,388.2152l-217.28168-128.03711,.57233-1.93799,217.28174,128.03717c.53516,.15802,.84082,.71997,.6828,1.25513h0c-.15802,.53516-.71997,.84088-1.25513,.6828h-.00006Z"
              fill="#fff"
            />
            <path
              d="M396.09801,388.5014l-.57233-1.93799,217.28174-128.03708c.53516-.15808,1.09711,.14758,1.25519,.68274v.00006h0c.15802,.53516-.14764,1.09708-.6828,1.25513l-217.2818,128.03714Z"
              fill="#fff"
            />
            <rect
              x="416.51073"
              y="132.83949"
              width="176.60852"
              height="9.46095"
              rx="4.73047"
              ry="4.73047"
              fill="#e6e6e6"
            />
            <rect
              x="394.04098"
              y="162.37081"
              width="221.548"
              height="9.46095"
              rx="4.73047"
              ry="4.73047"
              fill="#e6e6e6"
            />
            <rect
              x="394.04098"
              y="191.90211"
              width="221.548"
              height="9.46095"
              rx="4.73047"
              ry="4.73047"
              fill="#6c63ff"
            />
            <path
              d="M811.9749,291.59402c-.0166,36.5195-23.09503,69.04623-57.55945,81.12424-.73193,.26254-1.46387,.50122-2.20374,.73199-45.20367,14.45111-93.56342-10.47873-108.01453-55.6824-14.45111-45.20367,10.4787-93.56345,55.68237-108.01456s93.56342,10.47876,108.01459,55.6824c2.70337,8.4563,4.07996,17.28046,4.08075,26.15836v-.00003Z"
              fill="#e6e6e6"
            />
            <path
              d="M610.82024,203.26077c-.34583,3.98294,2.6026,7.4921,6.58551,7.83792,.42468,.0369,.85181,.03619,1.27637-.00211l10.58148,23.44745,7.14471-11.29828-11.14374-20.534c-.625-3.9707-4.35059-6.68292-8.32129-6.05789-3.32239,.52295-5.85376,3.25436-6.12305,6.6069Z"
              fill="#ffb6b6"
            />
            <path
              d="M715.09838,291.56216c-.15399-.69296-.35059-1.37579-.58868-2.04456-1.51666-4.30963-4.60547-7.88721-8.64783-10.01624-.09546-.05569-.19891-.11139-.29437-.15912l-48.33881-24.52744-4.28815-8.36139-17.32751-33.7561-4.24835,1.26501-10.0401,2.9834-.23071,.06366,16.64331,56.00809,3.81873,2.9277,43.25513,33.07974,1.40814,1.082c7.18573,5.48517,17.30267,4.88989,23.79553-1.40015,.64752-.62106,1.24597-1.29135,1.78998-2.00485,3.29828-4.30405,4.5058-9.85449,3.2937-15.13977Z"
              fill="#6c63ff"
            />
            <path
              d="M741.97271,353.07562l-.25458-9.22858-.73193-26.763c2.64923-17.1286,4.52679-19.03-8.25-30.74084-.98718-.21167-1.83929-.8298-2.34692-1.70248-1.16156-2.37085,1.63092-6.39642-.77966-12.5939l-19.02203,1.08994-4.72571,6.36456-19.01416,25.61737c-.745,1.26651-1.4248,2.57028-2.03668,3.90622-8.13867,17.67758,2.89587,27.07327,3.75513,28.68826l5.26666,16.58765,2.90387,16.0864,.93878,2.23553,2.64923,.97064c16.90057,5.27795,35.01587,5.22797,51.88708-.14319-2.83936-7.06497-6.26428-13.88022-10.23907-20.37457Z"
              fill="#6c63ff"
            />
            <path
              d="M778.8153,418.13494c1.62732-3.65173-.01379-7.93121-3.66553-9.55853-.38934-.17352-.79327-.31232-1.20709-.41473l-2.34601-25.61731-10.44208,8.34637,3.82874,23.047c-.70569,3.95715,1.93011,7.73712,5.88727,8.44287,3.3111,.59045,6.59558-1.16473,7.9447-4.24567Z"
              fill="#ffb6b6"
            />
            <path
              d="M742.43419,292.52481c-2.75873-4.1738-7.11597-7.02582-12.04492-7.88406-1.05536-.19107-2.12567-.28693-3.19818-.28644-3.57446,.00052-7.06952,1.05484-10.04797,3.03113-.94489,.62357-1.82684,1.33768-2.6333,2.13217-7.22998,7.00238-7.41443,18.53998-.41205,25.76993l.00629,.0065,27.61426,28.55301,10.06403,10.40607,2.6333,18.46515,4.04944,28.40985,4.42334,.19092,10.46973,.46143,.23865,.008,1.74231-39.81033,.81146-18.56061-33.71637-50.8927Z"
              fill="#6c63ff"
            />
            <path
              d="M704.69835,228.37741c-6.72516,13.25534-2.33197,28.60931,10.14764,36.68341,13.49487,8.73093,31.01611,6.81921,36.68341-10.14767,6.3111-18.89435,1.12634-26.99988-10.14764-36.68341-13.21191-11.34802-29.41699-4.17441-36.68341,10.14767Z"
              fill="#2f2e41"
            />
            <path
              d="M737.80352,257.90609c-7.13275,9.34955-20.49426,11.14664-29.84381,4.01392-9.33746-7.1235-11.14392-20.46234-4.03754-29.81284l.18475-.24268c7.34027-9.18753,20.73865-10.68506,29.92621-3.34479,8.97852,7.17325,10.64484,20.17703,3.76508,29.38239l.00531,.004Z"
              fill="#ffb6b6"
            />
            <path
              d="M698.18102,226.23123c3.46045,3.29269,7.67841,5.68271,12.28143,6.95901,.92273-1.06738,2.01654-1.97385,3.23669-2.68231-.58411,1.21518-.98438,2.51041-1.18781,3.84323,2.05298,4.26053,10.43768,7.32269,18.45142,10.45508l10.61432-18.73242-14.04932-7.96072c-11.289-7.80475-24.57874-4.47366-29.34674,8.11813Z"
              fill="#2f2e41"
            />
            <path
              d="M749.58367,218.25323c2.08191-.76715,4.41077-.42709,6.18634,.90338,1.71045,1.30029,3.09332,2.98233,4.03833,4.9119,1.71838,3.12204,2.953,6.48685,3.66156,9.9794,.60602,3.02145,.50342,6.67438-2.20752,8.25113-2.26202,1.3157-5.49634,.48727-7.57538-1.26859-1.92682-1.84222-3.38843-4.11581-4.26447-6.63354-1.01428-2.40955-1.97382-4.90793-3.77661-6.90906l1.87299,.87442c-.59204-1.79739-.86786-3.68387-.81531-5.57553,.0871-1.91531,1.18329-3.64081,2.88007-4.53351Z"
              fill="#2f2e41"
            />
            <path
              d="M725.28393,220.70834l15.07263,8.54056c8.48724,4.80911,11.46893,15.58795,6.65985,24.0752h0c-6.97107,12.30002-22.15222,17.28207-35.05591,11.50446l13.77313-12.15863-18.6842,9.51978-3.98926-2.26041c20.03845-3.64343,23.90393-19.36194,22.22375-39.22095Z"
              fill="#2f2e41"
            />
            <path
              d="M753.75713,235.71908c2.53668,2.95328,6.50836,4.10126,10.09119,5.63812,12.83752,5.63181,22.06708,17.23804,24.66315,31.01407,.99054,5.52701,.86102,11.24835,2.4256,16.63647,1.5553,5.38812,5.40662,10.67444,10.93359,11.6095,3.74017,.63879,7.48962-.80545,11.00763-2.2312,1.93494-.77762,3.86981-1.55838,5.80475-2.34222-2.01825-5.06415-4.03339-10.12823-6.04541-15.19229,3.2337,4.77917,6.99445,9.17966,11.21136,13.11853,6.9342-2.7959,13.87451-5.5918,20.82111-8.38773-17.09015,.06482-14.17389-16.52539-17.99744-33.17114-2.10156-9.14685-19.99713-15.34042-23.50592-24.04288-5.48029-13.64365-20.98334-20.26138-34.62701-14.78107-5.87927,2.36154-10.72357,6.74246-13.66235,12.3555-3.50885,1.39795-3.61066,6.86017-1.12024,9.77634Z"
              fill="#2f2e41"
            />
            <path
              d="M257.30968,395.97247c-3.20206-4.05475-2.51083-9.9375,1.54391-13.13959,.39273-.31012,.80975-.58826,1.24698-.83173l-4.88062-46.37146,12.49438-4.50345,5.39407,55.1185c2.16846,4.68152,.13116,10.23456-4.55035,12.40295-3.91721,1.81445-8.56744,.70844-11.24838-2.67517v-.00006Z"
              fill="#ffb6b6"
            />
            <path
              d="M250.62816,225.96145s20.28299,9.89639,20.34885,21.53079,1.746,22.15723,.15872,26.65887,4.03357,37.22287,1.4024,40.46326,2.78964,4.89874-.05884,10.44424-4.10974,6.58942-3.06586,7.85068,2.57727,25.30099,2.57727,25.30099l-16.71341,2.09-17.77936-77.59161,13.13022-56.74722Z"
              fill="#3f3d56"
            />
            <path
              d="M154.17156,400.68304c3.80133-3.49908,4.04636-9.41724,.5473-13.21857-.33899-.36823-.70697-.70868-1.1004-1.01807l12.13101-45.02191-11.62799-6.41714-14.01721,53.57852c-2.87949,4.28107-1.74329,10.08582,2.53778,12.96527,3.58212,2.40942,8.34863,2.05048,11.52954-.86816l-.00003,.00006Z"
              fill="#ffb6b6"
            />
            <path
              d="M187.5754,233.85211s-21.58966,6.57455-23.48911,18.05301-5.21771,21.6048-4.36008,26.30038-9.85211,36.12131-7.76477,39.73599-3.52713,4.39761-1.58865,10.32291,3.01938,7.155,1.7897,8.23587-6.53427,24.57819-6.53427,24.57819l16.17484,4.69907,29.79099-73.81778-4.01865-58.10764Z"
              fill="#3f3d56"
            />
            <polygon
              points="270.48699 602.1089 284.88698 602.10792 291.738 546.56391 270.48498 546.56489 270.48699 602.1089"
              fill="#ffb6b6"
            />
            <path
              d="M289.67931,603.40508v-9.76245l-3.78574,.23126-15.41046,.91296-3.56656,.21912-2.72665,32.69562-.14606,1.75287h10.22491l.3287-1.74066,1.48499-7.91217,3.83438,7.91217,.8399,1.74066h27.10834c3.35727-.02124,6.07172-2.74115,6.08627-6.09845,1.14432-5.34393-21.39932-16.89563-24.27203-19.95093Z"
              fill="#2f2e41"
            />
            <polygon
              points="101.77999 586.43391 114.30499 593.53993 147.67399 548.61091 129.18899 538.12391 101.77999 586.43391"
              fill="#ffb6b6"
            />
            <path
              d="M117.83901,597.02661l4.80817-8.48431-3.38394-1.66766-13.86459-6.80444-3.21356-1.5824-15.78781,23.11572-3.71268,5.42889,4.19955,2.38586,4.68649,2.66577,6.354-7.49829-.70599,10.69965,22.14191,12.57428h.01218l1.42422,.80334c2.9281,1.6543,6.64273,.62482,8.30164-2.30066,3.62753-4.08984-10.27359-25.24579-11.25958-29.33575Z"
              fill="#2f2e41"
            />
            <path
              d="M199.02364,329.45501c-31.91611,1.14673-43.13263,131.27441-33.38629,133.63452l-45.48328,84.76471,64.73886,29.01984,42.56693-147.80182,7.09448,54.39105-9.45932,86.31628,41.84613,10.11975,28.94394-2.06744c-7.521-102.88745-26.29919-211.40192-41.86145-253.37689l-55,5Z"
              fill="#2f2e41"
            />
            <path
              d="M184.37234,338.57876l-.20999,.79001c20.39999,11.35001,34.33044,8.92169,56.63046,2.0517l16.27957-3.42169c3.55319-4.63348,.65738-9.16544-3.27957-13.57831l9.75955-80.27167c-.06564-10.39984-8.54959-18.77734-18.94943-18.7117-.42731,.00269-.85443,.01993-1.28058,.0517l-14.66-10.85999-20.87,.72-13.95999,15.42001-8.34,2.98001-6.48001,2.31c-1.31,1.17999-2.73999,2.54001-4.10999,4.04001l10.25,61,4.35999,18.23999c-5.84454,6.66379-9.06464,13.16849-5.14001,19.23993Z"
              fill="#3f3d56"
            />
            <path
              d="M65.97402,619.37982c-15.18625-1.80811-28.74501-10.37433-36.89941-23.3125-5.23584-8.49121-7.9375-18.5752-10.55029-28.32715-.76076-2.83789-1.54688-5.77246-2.37939-8.60156-1.92578-6.32465,.1898-13.18469,5.34326-17.32617,4.98201-4.17596,12.00356-4.90057,17.7334-1.83008l.61133,.32422,1.07129,24.07812c1.5874-3.22559,5.0708-10.5127,7.83057-17.78906l.23145-.60938,.52881,.38184c5.54837,3.98615,10.57274,8.65503,14.95459,13.89648,15.65994,19.0379,22.15289,44.00043,17.75391,68.25586l-.1333,.71387-16.09619-9.85449Z"
              fill="#f2f2f2"
            />
            <path
              d="M0,629.05828c-.00195,.65527,.52766,1.18805,1.18292,1.19H843.48003c.65723,0,1.19-.53278,1.19-1.19s-.53278-1.19-1.19-1.19H1.19001c-.65529-.00195-1.18806,.52771-1.19,1.18298v.00702Z"
              fill="#ccc"
            />
            <path
              id="b-337"
              d="M247.90838,200.93521l.02054-.00537c2.2728-.6015,3.62769-2.93155,3.02621-5.20438l-6.06329-22.97c-1.08231-4.11636-2.98126-7.97308-5.58395-11.34082-5.08978-6.56921-12.51831-10.92087-20.73746-12.14807-4.24207-.62857-8.56747-.39169-12.71555,.69629-16.97018,4.45108-21.70999,10.06369-22.66782,38.78662s6.07254,23.005,6.07254,23.005c.14551,.5538,.40109,1.07263,.75146,1.52551,.68546,.88293,1.68555,1.46686,2.79138,1.62982,.56723,.08304,1.14539,.05121,1.70007-.0936,21.19214-2.18152,42.65457-4.168,53.40927-13.88184l-.00342,.00082Z"
              fill="#2f2e41"
            />
            <path
              id="c-338"
              d="M198.08202,176.68508c-3.11005,12.55374,4.54559,25.25177,17.09933,28.36182,6.01666,1.49057,12.37885,.53488,17.69205-2.65753,5.31174-3.16888,9.13412-8.332,10.61438-14.33743,3.09973-12.5563-4.56635-25.24805-17.12265-28.34778-6.00168-1.4816-12.34573-.53-17.64856,2.64728-5.31866,3.16425-9.14856,8.32675-10.63431,14.3345l-.00024-.00085Z"
              fill="#ffb6b6"
            />
            <path
              id="d-339"
              d="M252.67061,172.70178c-.8562-3.25549-2.35809-6.30563-4.41647-8.96918-2.92413-7.28979-7.51099-13.18179-16.39832-9.60471-3.33337-.49261-6.73175-.30972-9.99301,.53778l-4.60349,1.19052c-.05173,.01334-.10339,.02682-.155,.0405-13.3862,3.54233-21.36624,17.26559-17.82391,30.65179h0l.12143,.46008,9.73611-2.52802,.87057-10.14017,3.11356,9.10767,5.02921-1.3038,.43835-5.11563,1.57089,4.59167c9.53577,3.7048,20.58755,.02933,32.62753-8.45642l-.11746-.4621Z"
              fill="#2f2e41"
            />
            <path
              id="e-340"
              d="M230.33321,204.8002c.3483,.70236,.49252,1.48837,.41623,2.26865-.03641,.39865-.12851,.79025-.27362,1.16333-.12454,.31812-.28625,.62039-.48178,.90054-.57983,.82767-1.43561,1.42163-2.41382,1.67532-.06104,.01553-.12238,.02988-.18399,.04309s-.12363,.02502-.186,.0354c-.06281,.01111-.12579,.02048-.18893,.02802-.06314,.0076-.12686,.01401-.19119,.01941l-3.61752,.28381-7.43573-8.90265,2.45599,9.30408-16.43982,1.31732-10.42206-39.48254,26.34338-6.81863-.45099,.92712c-1.48984,3.10461-2.09424,6.56012-1.7467,9.98611,.36884,3.46564,1.32874,6.84244,2.8381,9.98386,1.50195,3.18536,3.30627,6.21918,5.38812,9.05966,1.82971,2.52026,3.80307,4.93301,5.91034,7.22626,.27145,.29388,.50034,.62439,.67999,.98184Z"
              fill="#2f2e41"
            />
            <g>
              <ellipse
                cx="360.75838"
                cy="8.64507"
                rx="8.45661"
                ry="8.64507"
                fill="#3f3d56"
              />
              <ellipse
                cx="389.97213"
                cy="8.64507"
                rx="8.45661"
                ry="8.64507"
                fill="#3f3d56"
              />
              <ellipse
                cx="419.18588"
                cy="8.64507"
                rx="8.45661"
                ry="8.64507"
                fill="#3f3d56"
              />
              <path
                d="M452.4973,15.47786c-.25977,0-.51904-.10059-.71484-.30078l-5.70605-5.83301c-.38037-.38867-.38037-1.00977,0-1.39844l5.70605-5.83252c.38721-.39453,1.021-.40088,1.41406-.01562,.39502,.38623,.40186,1.01953,.01562,1.41406l-5.02197,5.1333,5.02197,5.13379c.38623,.39453,.37939,1.02783-.01562,1.41406-.19434,.19043-.44678,.28516-.69922,.28516Z"
                fill="#3f3d56"
              />
              <path
                d="M462.08568,15.47786c-.25244,0-.50488-.09473-.69922-.28516-.39502-.38623-.40186-1.01904-.01562-1.41406l5.02148-5.13379-5.02148-5.1333c-.38623-.39453-.37939-1.02783,.01562-1.41406,.39404-.38672,1.02783-.37939,1.41406,.01562l5.70557,5.83252c.38037,.38867,.38037,1.00977,0,1.39844l-5.70557,5.83301c-.1958,.2002-.45508,.30078-.71484,.30078Z"
                fill="#3f3d56"
              />
              <path
                d="M760.59551,1.0009h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19V13.8109c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19V3.1909c0-1.21002-.98999-2.19-2.20001-2.19Z"
                fill="#3f3d56"
              />
              <path
                d="M734.59551,1.0009h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19V13.8109c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19V3.1909c0-1.21002-.98999-2.19-2.20001-2.19Z"
                fill="#3f3d56"
              />
              <path
                d="M785.09551,1.5009h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19V14.3109c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19V3.6909c0-1.21002-.98999-2.19-2.20001-2.19Z"
                fill="#3f3d56"
              />
              <path
                d="M625.17381,5.54088h-84.81c-1.48004,0-2.67004,1.20001-2.67004,2.67004s1.19,2.66998,2.67004,2.66998h84.81c1.46997,0,2.66998-1.20001,2.66998-2.66998s-1.20001-2.67004-2.66998-2.67004Z"
                fill="#3f3d56"
              />
            </g>
          </Box>
        </Box>

        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Your email"
            placeholder="email@example.com"
            type="email"
            mb="sm"
            required
            {...form.getInputProps('email')}
          />

          <Select
            label="Subject"
            mb="sm"
            data={[
              'Upgrade account (Employer)',
              'Billing / Payments',
              'Feeback',
              'General question',
              'Other'
            ]}
            placeholder="What can we assist you with?"
            required
            {...form.getInputProps('subject')}
          />

          <Textarea
            label="Message"
            mb="sm"
            placeholder="Please explain your problem or provide feedback based on the subject you chose"
            autosize
            minRows={5}
            required
            {...form.getInputProps('body')}
          />

          <Button type="submit" mt="md" loading={loading}>
            Submit form
          </Button>
        </Box>
      </SimpleGrid>
    </Layout>
  )
}

export default Contact
